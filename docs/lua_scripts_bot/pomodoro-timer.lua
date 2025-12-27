--[[
    Pomodoro Timer Pro for OBS + Firebase Bot Integration
    ======================================================
    
    Features:
    - Session tracking (X / Y)
    - Auto-advance between phases
    - Sound notifications on phase change
    - Skip functionality
    - Firebase sync via JSON file
    
    Controls: Start, Pause/Resume, Stop, Skip
    
    Author: Dominik Tyrnel
    Version: 2.0.0
]]--

obs = obslua

------------------------------------------------------------
-- CONFIGURATION
------------------------------------------------------------

local config = {
    -- Time settings (in minutes)
    focus_minutes = 25,
    short_break_minutes = 5,
    long_break_minutes = 15,
    
    -- Session settings
    total_sessions = 8,
    sessions_before_long_break = 4,
    
    -- Text sources
    mode_source = "",      -- Režim display (집중, 휴식, etc.)
    timer_source = "",     -- Timer display (MM:SS)
    session_source = "",   -- Session display (세션 X / Y)
    
    -- Sound
    sound_file = "",       -- Path to notification sound
    
    -- Firebase sync
    output_file = ""       -- JSON file path
}

------------------------------------------------------------
-- RUNTIME STATE
------------------------------------------------------------

local state = {
    phase = "ready",           -- ready, focus, shortBreak, longBreak, completed
    status = "stopped",        -- running, paused, stopped
    current_session = 1,
    remaining_seconds = 0,
    total_seconds = 0
}

local timer_active = false
local paused_phase = nil      -- Store phase when paused

-- Hotkey IDs
local hotkey_start_id = obs.OBS_INVALID_HOTKEY_ID
local hotkey_pause_id = obs.OBS_INVALID_HOTKEY_ID
local hotkey_stop_id = obs.OBS_INVALID_HOTKEY_ID
local hotkey_skip_id = obs.OBS_INVALID_HOTKEY_ID

------------------------------------------------------------
-- MODE LABELS (Korean)
------------------------------------------------------------

local MODE_LABELS = {
    ready = "대기중",
    focus = "집중",
    shortBreak = "휴식",
    longBreak = "긴 휴식",
    paused = "일시정지",
    completed = "🎉 완료!"
}

------------------------------------------------------------
-- UTILITY FUNCTIONS
------------------------------------------------------------

function get_epoch_ms()
    return os.time() * 1000
end

function format_time(seconds)
    if seconds < 0 then seconds = 0 end
    local mins = math.floor(seconds / 60)
    local secs = seconds % 60
    return string.format("%02d:%02d", mins, secs)
end

function format_session()
    return string.format("세션 %d / %d", state.current_session, config.total_sessions)
end

function update_source(source_name, text)
    if source_name == "" or source_name == nil then return end
    
    local source = obs.obs_get_source_by_name(source_name)
    if source ~= nil then
        local settings = obs.obs_data_create()
        obs.obs_data_set_string(settings, "text", text)
        obs.obs_source_update(source, settings)
        obs.obs_data_release(settings)
        obs.obs_source_release(source)
    end
end

function play_sound()
    if config.sound_file == "" then return end
    
    -- Create a media source to play the sound
    local sound_source = obs.obs_source_create_private("ffmpeg_source", "pomodoro_sound", nil)
    if sound_source ~= nil then
        local settings = obs.obs_data_create()
        obs.obs_data_set_string(settings, "local_file", config.sound_file)
        obs.obs_data_set_bool(settings, "looping", false)
        obs.obs_data_set_bool(settings, "restart_on_activate", true)
        obs.obs_source_update(sound_source, settings)
        obs.obs_data_release(settings)
        
        -- Play and release after a delay
        obs.obs_source_media_restart(sound_source)
        
        -- Release after 5 seconds (enough for most notification sounds)
        obs.timer_add(function()
            obs.obs_source_release(sound_source)
            obs.remove_current_callback()
        end, 5000)
    end
end

function write_json()
    if config.output_file == "" then return end
    
    local json = string.format(
        '{"state":"%s","phase":"%s","currentSession":%d,"totalSessions":%d,"remainingSeconds":%d,"totalSeconds":%d,"updatedAtEpochMs":%d}',
        state.status,
        state.phase,
        state.current_session,
        config.total_sessions,
        state.remaining_seconds,
        state.total_seconds,
        get_epoch_ms()
    )
    
    local file = io.open(config.output_file, "w")
    if file then
        file:write(json)
        file:close()
    end
end

function get_phase_seconds(phase)
    if phase == "focus" then
        return config.focus_minutes * 60
    elseif phase == "shortBreak" then
        return config.short_break_minutes * 60
    elseif phase == "longBreak" then
        return config.long_break_minutes * 60
    end
    return 0
end

------------------------------------------------------------
-- DISPLAY UPDATE
------------------------------------------------------------

function update_display()
    -- Mode display
    local mode_text = MODE_LABELS[state.phase] or state.phase
    if state.status == "paused" then
        mode_text = MODE_LABELS["paused"]
    end
    update_source(config.mode_source, mode_text)
    
    -- Timer display
    update_source(config.timer_source, format_time(state.remaining_seconds))
    
    -- Session display
    update_source(config.session_source, format_session())
    
    -- Write to JSON for Firebase sync
    write_json()
end

------------------------------------------------------------
-- PHASE TRANSITIONS
------------------------------------------------------------

function start_phase(phase)
    state.phase = phase
    state.total_seconds = get_phase_seconds(phase)
    state.remaining_seconds = state.total_seconds
    state.status = "running"
    
    play_sound()
    update_display()
    
    if not timer_active then
        obs.timer_add(timer_tick, 1000)
        timer_active = true
    end
end

function advance_to_next_phase()
    if state.phase == "focus" then
        -- After focus: decide break type
        local need_long_break = (state.current_session % config.sessions_before_long_break == 0)
        
        if need_long_break and config.long_break_minutes > 0 then
            start_phase("longBreak")
        elseif config.short_break_minutes > 0 then
            start_phase("shortBreak")
        else
            -- No breaks configured, go to next session
            go_to_next_session()
        end
        
    elseif state.phase == "shortBreak" or state.phase == "longBreak" then
        -- After break: go to next session
        go_to_next_session()
    end
end

function go_to_next_session()
    if state.current_session >= config.total_sessions then
        -- All sessions completed!
        complete_all()
    else
        state.current_session = state.current_session + 1
        start_phase("focus")
    end
end

function complete_all()
    state.phase = "completed"
    state.status = "stopped"
    state.remaining_seconds = 0
    
    if timer_active then
        obs.timer_remove(timer_tick)
        timer_active = false
    end
    
    play_sound()
    update_display()
end

------------------------------------------------------------
-- TIMER
------------------------------------------------------------

function timer_tick()
    if state.status ~= "running" then return end
    
    state.remaining_seconds = state.remaining_seconds - 1
    update_display()
    
    if state.remaining_seconds <= 0 then
        advance_to_next_phase()
    end
end

------------------------------------------------------------
-- CONTROLS
------------------------------------------------------------

function do_start()
    if state.status == "stopped" or state.phase == "completed" or state.phase == "ready" then
        -- Fresh start
        state.current_session = 1
        start_phase("focus")
    elseif state.status == "paused" then
        -- Resume from pause
        do_resume()
    end
end

function do_pause()
    if state.status == "running" then
        state.status = "paused"
        paused_phase = state.phase
        update_display()
    end
end

function do_resume()
    if state.status == "paused" then
        state.status = "running"
        update_display()
    end
end

function do_pause_toggle()
    if state.status == "running" then
        do_pause()
    elseif state.status == "paused" then
        do_resume()
    end
end

function do_stop()
    state.phase = "ready"
    state.status = "stopped"
    state.current_session = 1
    state.remaining_seconds = 0
    state.total_seconds = 0
    
    if timer_active then
        obs.timer_remove(timer_tick)
        timer_active = false
    end
    
    update_display()
end

function do_skip()
    if state.status == "stopped" or state.phase == "ready" or state.phase == "completed" then
        return -- Nothing to skip
    end
    
    if state.phase == "focus" then
        -- Skip focus: go to break or next session
        local need_long_break = (state.current_session % config.sessions_before_long_break == 0)
        
        if need_long_break and config.long_break_minutes > 0 then
            start_phase("longBreak")
        elseif config.short_break_minutes > 0 then
            start_phase("shortBreak")
        else
            go_to_next_session()
        end
        
    elseif state.phase == "shortBreak" then
        -- Skip short break: check if long break needed, else next session
        local need_long_break = (state.current_session % config.sessions_before_long_break == 0)
        
        if need_long_break and config.long_break_minutes > 0 then
            start_phase("longBreak")
        else
            go_to_next_session()
        end
        
    elseif state.phase == "longBreak" then
        -- Skip long break: go to next session
        go_to_next_session()
    end
end

------------------------------------------------------------
-- HOTKEY CALLBACKS
------------------------------------------------------------

function on_start(pressed)
    if pressed then do_start() end
end

function on_pause_toggle(pressed)
    if pressed then do_pause_toggle() end
end

function on_stop(pressed)
    if pressed then do_stop() end
end

function on_skip(pressed)
    if pressed then do_skip() end
end

------------------------------------------------------------
-- OBS SCRIPT INTERFACE
------------------------------------------------------------

function script_description()
    return [[
Pomodoro Timer Pro
==================
Session-based pomodoro timer with Firebase sync.

Features:
• Session tracking (세션 X / Y)
• Auto-advance between phases
• Sound notifications
• Skip functionality

Controls:
• Start - Begin from Session 1
• Pause/Resume - Toggle pause
• Stop - Reset everything
• Skip - Skip to next phase

Setup:
1. Set time durations
2. Set session counts
3. Assign text sources
4. Optionally set sound file
5. Set JSON path for Firebase sync
]]
end

function script_properties()
    local props = obs.obs_properties_create()
    
    -- Time settings
    obs.obs_properties_add_int(props, "focus_minutes", "Focus Duration (min)", 1, 120, 1)
    obs.obs_properties_add_int(props, "short_break_minutes", "Short Break (min, 0=skip)", 0, 60, 1)
    obs.obs_properties_add_int(props, "long_break_minutes", "Long Break (min, 0=skip)", 0, 60, 1)
    
    -- Session settings
    obs.obs_properties_add_int(props, "total_sessions", "Total Sessions", 1, 20, 1)
    obs.obs_properties_add_int(props, "sessions_before_long_break", "Sessions before Long Break", 1, 10, 1)
    
    -- Text sources
    local sources = obs.obs_enum_sources()
    
    local mode_list = obs.obs_properties_add_list(props, "mode_source", "Mode Display (집중/휴식)", obs.OBS_COMBO_TYPE_EDITABLE, obs.OBS_COMBO_FORMAT_STRING)
    local timer_list = obs.obs_properties_add_list(props, "timer_source", "Timer Display (MM:SS)", obs.OBS_COMBO_TYPE_EDITABLE, obs.OBS_COMBO_FORMAT_STRING)
    local session_list = obs.obs_properties_add_list(props, "session_source", "Session Display (세션 X/Y)", obs.OBS_COMBO_TYPE_EDITABLE, obs.OBS_COMBO_FORMAT_STRING)
    
    if sources ~= nil then
        for _, source in ipairs(sources) do
            local source_id = obs.obs_source_get_unversioned_id(source)
            if source_id == "text_gdiplus" or source_id == "text_ft2_source" then
                local name = obs.obs_source_get_name(source)
                obs.obs_property_list_add_string(mode_list, name, name)
                obs.obs_property_list_add_string(timer_list, name, name)
                obs.obs_property_list_add_string(session_list, name, name)
            end
        end
    end
    obs.source_list_release(sources)
    
    -- Sound file
    obs.obs_properties_add_path(props, "sound_file", "Notification Sound", obs.OBS_PATH_FILE, "Audio Files (*.mp3 *.wav *.ogg)", nil)
    
    -- JSON output
    obs.obs_properties_add_path(props, "output_file", "Firebase Sync JSON", obs.OBS_PATH_FILE_SAVE, "JSON Files (*.json)", nil)
    
    -- Control buttons
    obs.obs_properties_add_button(props, "btn_start", "▶ Start", function() do_start() return false end)
    obs.obs_properties_add_button(props, "btn_pause", "⏸ Pause / Resume", function() do_pause_toggle() return false end)
    obs.obs_properties_add_button(props, "btn_stop", "⏹ Stop", function() do_stop() return false end)
    obs.obs_properties_add_button(props, "btn_skip", "⏭ Skip", function() do_skip() return false end)
    
    return props
end

function script_defaults(settings)
    obs.obs_data_set_default_int(settings, "focus_minutes", 25)
    obs.obs_data_set_default_int(settings, "short_break_minutes", 5)
    obs.obs_data_set_default_int(settings, "long_break_minutes", 15)
    obs.obs_data_set_default_int(settings, "total_sessions", 8)
    obs.obs_data_set_default_int(settings, "sessions_before_long_break", 4)
end

function script_update(settings)
    config.focus_minutes = obs.obs_data_get_int(settings, "focus_minutes")
    config.short_break_minutes = obs.obs_data_get_int(settings, "short_break_minutes")
    config.long_break_minutes = obs.obs_data_get_int(settings, "long_break_minutes")
    config.total_sessions = obs.obs_data_get_int(settings, "total_sessions")
    config.sessions_before_long_break = obs.obs_data_get_int(settings, "sessions_before_long_break")
    
    config.mode_source = obs.obs_data_get_string(settings, "mode_source")
    config.timer_source = obs.obs_data_get_string(settings, "timer_source")
    config.session_source = obs.obs_data_get_string(settings, "session_source")
    
    config.sound_file = obs.obs_data_get_string(settings, "sound_file")
    config.output_file = obs.obs_data_get_string(settings, "output_file")
    
    -- Update display with current state
    update_display()
end

function script_load(settings)
    -- Register hotkeys
    hotkey_start_id = obs.obs_hotkey_register_frontend("pomodoro_start", "Pomodoro: Start", on_start)
    hotkey_pause_id = obs.obs_hotkey_register_frontend("pomodoro_pause", "Pomodoro: Pause/Resume", on_pause_toggle)
    hotkey_stop_id = obs.obs_hotkey_register_frontend("pomodoro_stop", "Pomodoro: Stop", on_stop)
    hotkey_skip_id = obs.obs_hotkey_register_frontend("pomodoro_skip", "Pomodoro: Skip", on_skip)
    
    -- Load saved hotkeys
    local arrays = {
        start = obs.obs_data_get_array(settings, "hotkey_start"),
        pause = obs.obs_data_get_array(settings, "hotkey_pause"),
        stop = obs.obs_data_get_array(settings, "hotkey_stop"),
        skip = obs.obs_data_get_array(settings, "hotkey_skip")
    }
    
    obs.obs_hotkey_load(hotkey_start_id, arrays.start)
    obs.obs_hotkey_load(hotkey_pause_id, arrays.pause)
    obs.obs_hotkey_load(hotkey_stop_id, arrays.stop)
    obs.obs_hotkey_load(hotkey_skip_id, arrays.skip)
    
    for _, arr in pairs(arrays) do
        obs.obs_data_array_release(arr)
    end
    
    -- Initial display
    update_display()
end

function script_save(settings)
    local arrays = {
        start = obs.obs_hotkey_save(hotkey_start_id),
        pause = obs.obs_hotkey_save(hotkey_pause_id),
        stop = obs.obs_hotkey_save(hotkey_stop_id),
        skip = obs.obs_hotkey_save(hotkey_skip_id)
    }
    
    obs.obs_data_set_array(settings, "hotkey_start", arrays.start)
    obs.obs_data_set_array(settings, "hotkey_pause", arrays.pause)
    obs.obs_data_set_array(settings, "hotkey_stop", arrays.stop)
    obs.obs_data_set_array(settings, "hotkey_skip", arrays.skip)
    
    for _, arr in pairs(arrays) do
        obs.obs_data_array_release(arr)
    end
end

function script_unload()
    if timer_active then
        obs.timer_remove(timer_tick)
        timer_active = false
    end
end
