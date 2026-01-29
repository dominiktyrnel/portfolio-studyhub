"""
Pomodoro Timer for OBS Studio (Python)
========================================
Direct Firebase sync - no JSON file needed!

Setup in OBS:
1. Tools → Scripts → Python Settings → Set path to Python 3.12
2. Add this script
3. Configure settings (durations, sounds, sources)
4. Use BUTTONS in script panel or hotkeys

Firebase writes to: runtime/obsPomodoro
"""

import obspython as obs
import requests
import json
import time
import threading
from datetime import datetime

# Thread lock for serializing timeline writes
timeline_lock = threading.Lock()

# =============================================================================
# FIREBASE CONFIG
# =============================================================================
FIREBASE_PROJECT_ID = "YOUR_PROJECT_ID"
FIREBASE_API_KEY = "YOUR_FIREBASE_API_KEY"
FIREBASE_URL = f"https://firestore.googleapis.com/v1/projects/{FIREBASE_PROJECT_ID}/databases/(default)/documents"

# =============================================================================
# DEFAULT SETTINGS
# =============================================================================
focus_duration = 25 * 60      # 25 minutes
short_break_duration = 5 * 60  # 5 minutes
long_break_duration = 15 * 60  # 15 minutes
sessions_before_long = 4       # Long break after 4 sessions
total_sessions = 8             # Total sessions to complete

# OBS Source names
mode_source = "pomodoro_mode"
timer_source = "pomodoro_timer"
session_source = "pomodoro_session"

# Sound file path
sound_file = ""

# =============================================================================
# STATE
# =============================================================================
class PomodoroState:
    def __init__(self):
        self.reset()
    
    def reset(self):
        self.mode = "ready"           # ready, focus, shortBreak, longBreak, paused, completed
        self.running = False
        self.paused = False
        self.paused_from = None       # Mode before pause
        self.current_session = 1
        self.time_remaining = 0
        self.phase_duration = 0
        self.phase_started_at = None
        self.timer_callback = None
        self.last_sync = 0

state = PomodoroState()

# =============================================================================
# KOREAN LABELS
# =============================================================================
MODE_LABELS = {
    "ready": "대기중",
    "focus": "집중",
    "shortBreak": "휴식",
    "longBreak": "긴 휴식",
    "paused": "일시정지",
    "completed": "🎉 완료!"
}

# =============================================================================
# FIREBASE SYNC (runs in background thread)
# =============================================================================
def sync_to_firebase():
    """Send current state to Firebase Firestore REST API"""
    try:
        now = time.time()
        
        # Calculate timestamps
        phase_started_ts = None
        ends_at_ts = None
        
        if state.phase_started_at and state.running and not state.paused:
            phase_started_ts = state.phase_started_at
            ends_at_ts = phase_started_ts + state.phase_duration
        
        # Build Firestore document
        doc = {
            "fields": {
                "mode": {"stringValue": state.mode},
                "running": {"booleanValue": state.running},
                "paused": {"booleanValue": state.paused},
                "currentSession": {"integerValue": str(state.current_session)},
                "totalSessions": {"integerValue": str(total_sessions)},
                "timeRemaining": {"integerValue": str(state.time_remaining)},
                "durationSec": {"integerValue": str(state.phase_duration)},
                "updatedAt": {"timestampValue": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S.000Z")},
                "source": {"stringValue": "obs_python"}
            }
        }
        
        if phase_started_ts:
            doc["fields"]["phaseStartedAt"] = {
                "timestampValue": datetime.utcfromtimestamp(phase_started_ts).strftime("%Y-%m-%dT%H:%M:%S.000Z")
            }
        
        if ends_at_ts:
            doc["fields"]["endsAt"] = {
                "timestampValue": datetime.utcfromtimestamp(ends_at_ts).strftime("%Y-%m-%dT%H:%M:%S.000Z")
            }
        
        # PATCH to Firestore (upsert) - with API key for authentication
        url = f"{FIREBASE_URL}/runtime/obsPomodoro?key={FIREBASE_API_KEY}"
        headers = {"Content-Type": "application/json"}
        
        response = requests.patch(
            url,
            headers=headers,
            data=json.dumps(doc),
            timeout=5
        )
        
        if response.status_code in [200, 201]:
            state.last_sync = now
            print(f"[Pomodoro] Firebase sync OK: {state.mode}")
        else:
            print(f"[Pomodoro] Firebase error: {response.status_code} - {response.text[:100]}")
            
    except Exception as e:
        print(f"[Pomodoro] Firebase sync failed: {e}")

def async_sync():
    """Run sync in background thread to not block OBS"""
    thread = threading.Thread(target=sync_to_firebase, daemon=True)
    thread.start()

# =============================================================================
# TIMELINE EVENT LABELS (KR/EN) - Full motivational messages (no emojis, web has icons)
# =============================================================================
TIMELINE_LABELS = {
    "START": {
        "kr": "시작 — 지금 시작했어요. 오늘의 흐름은 여기서 만들어져요.",
        "en": "Start — You've started. Today's momentum begins right here."
    },
    "STOP": {
        "kr": "종료 — 오늘은 여기까지. 충분히 잘했어요.",
        "en": "End — That's enough for today. You did well."
    },
    "FOCUS": {
        "kr": "집중 — 지금은 딱 한 가지에만. 조용히, 끝까지.",
        "en": "Focus — One thing only. Quietly, all the way through."
    },
    "SHORT_BREAK": {
        "kr": "휴식 — 물 한 모금, 어깨 풀고 다시 가요.",
        "en": "Break — Take a sip of water, loosen your shoulders, and go again."
    },
    "LONG_BREAK": {
        "kr": "긴 휴식 — 숨 고르고 리셋해요. 다음 라운드 준비.",
        "en": "Long break — Breathe, reset, get ready for the next round."
    },
    "PAUSE": {
        "kr": "일시정지 — 잠깐 멈춰도 괜찮아요. 다시 돌아오면 돼요.",
        "en": "Pause — It's okay to pause. Just come back."
    },
    "RESUME": {
        "kr": "재개 — 다시 시작. 흐름만 잡으면 돼요.",
        "en": "Resume — Start again. Just catch the flow."
    },
    "NEW_SESSION": {
        "kr": "새 세션 — 새로운 시작. 화이팅!",
        "en": "New Session — Fresh start. Let's go!"
    },
    "COMPLETED": {
        "kr": "완료! — 완료! 오늘의 승리는 '꾸준함'이에요.",
        "en": "Done! — Done. Today's win is consistency."
    },
}

def append_to_timeline(event_type):
    """Append event to runtime/timeline.items for real-time web updates"""
    # Use lock to prevent race conditions
    with timeline_lock:
        try:
            labels = TIMELINE_LABELS.get(event_type, {"kr": event_type, "en": event_type})
            
            # Read from SEPARATE document to avoid conflicts with timer sync
            read_url = f"{FIREBASE_URL}/runtime/timeline?key={FIREBASE_API_KEY}"
            response = requests.get(read_url, timeout=5)
            
            timeline = []
            if response.status_code == 200:
                data = response.json()
                fields = data.get("fields", {})
                if "items" in fields and "arrayValue" in fields["items"]:
                    timeline = fields["items"]["arrayValue"].get("values", [])
                    print(f"[Pomodoro] DEBUG: Read {len(timeline)} existing items")
                else:
                    print(f"[Pomodoro] DEBUG: No items found, starting fresh")
            elif response.status_code == 404:
                print(f"[Pomodoro] DEBUG: Document doesn't exist, creating new")
            else:
                print(f"[Pomodoro] DEBUG: Read failed with status {response.status_code}")
            
            # Create new timeline item
            now_iso = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S.000Z")
            new_item = {
                "mapValue": {
                    "fields": {
                        "t": {"timestampValue": now_iso},
                        "type": {"stringValue": event_type.lower()},
                        "labelKR": {"stringValue": labels["kr"]},
                        "labelEN": {"stringValue": labels["en"]},
                        "by": {"stringValue": "obs"}
                    }
                }
            }
            
            # Deduplication: skip if last event has same type
            if len(timeline) > 0:
                last_item = timeline[-1]
                if "mapValue" in last_item:
                    last_fields = last_item["mapValue"].get("fields", {})
                    last_type = last_fields.get("type", {}).get("stringValue", "")
                    if last_type == event_type.lower():
                        print(f"[Pomodoro] Skipping duplicate timeline event: {event_type}")
                        return
            
            # Add new item
            timeline.append(new_item)
            
            # Keep only last 30 items
            if len(timeline) > 30:
                timeline = timeline[-30:]
            
            # Write back to runtime/timeline (separate from timer sync)
            doc = {
                "fields": {
                    "items": {
                        "arrayValue": {
                            "values": timeline
                        }
                    }
                }
            }
            
            # Use updateMask to only update items field
            write_url = f"{FIREBASE_URL}/runtime/timeline?key={FIREBASE_API_KEY}&updateMask.fieldPaths=items"
            headers = {"Content-Type": "application/json"}
            
            response = requests.patch(
                write_url,
                headers=headers,
                data=json.dumps(doc),
                timeout=5
            )
            
            if response.status_code in [200, 201]:
                print(f"[Pomodoro] Timeline updated: {event_type} (total: {len(timeline)} items)")
            else:
                print(f"[Pomodoro] Timeline write error: {response.status_code} - {response.text[:100]}")
                
        except Exception as e:
            print(f"[Pomodoro] Timeline append failed: {e}")

def async_timeline(event_type):
    """Run timeline append in background thread"""
    thread = threading.Thread(target=lambda: append_to_timeline(event_type), daemon=True)
    thread.start()

# =============================================================================
# OBS TEXT SOURCE UPDATES
# =============================================================================
def update_displays():
    """Update OBS text sources with current state"""
    # Mode display
    if mode_source:
        source = obs.obs_get_source_by_name(mode_source)
        if source:
            settings = obs.obs_data_create()
            obs.obs_data_set_string(settings, "text", MODE_LABELS.get(state.mode, state.mode))
            obs.obs_source_update(source, settings)
            obs.obs_data_release(settings)
            obs.obs_source_release(source)
    
    # Timer display (MM:SS)
    if timer_source:
        source = obs.obs_get_source_by_name(timer_source)
        if source:
            mins = state.time_remaining // 60
            secs = state.time_remaining % 60
            time_str = f"{mins:02d}:{secs:02d}"
            
            settings = obs.obs_data_create()
            obs.obs_data_set_string(settings, "text", time_str)
            obs.obs_source_update(source, settings)
            obs.obs_data_release(settings)
            obs.obs_source_release(source)
    
    # Session display
    if session_source:
        source = obs.obs_get_source_by_name(session_source)
        if source:
            session_str = f"세션 {state.current_session} / {total_sessions}"
            
            settings = obs.obs_data_create()
            obs.obs_data_set_string(settings, "text", session_str)
            obs.obs_source_update(source, settings)
            obs.obs_data_release(settings)
            obs.obs_source_release(source)

# =============================================================================
# SOUND NOTIFICATION
# =============================================================================
def play_sound():
    """Play notification sound if configured"""
    if not sound_file:
        return
    
    try:
        source = obs.obs_source_create_private("ffmpeg_source", "pomodoro_sound", None)
        if source:
            settings = obs.obs_data_create()
            obs.obs_data_set_string(settings, "local_file", sound_file)
            obs.obs_data_set_bool(settings, "looping", False)
            obs.obs_data_set_bool(settings, "restart_on_activate", True)
            obs.obs_source_update(source, settings)
            obs.obs_data_release(settings)
            
            obs.obs_source_media_restart(source)
            obs.obs_source_release(source)
    except Exception as e:
        print(f"[Pomodoro] Sound error: {e}")

# =============================================================================
# TIMER LOGIC
# =============================================================================
def timer_tick():
    """Called every second when timer is running"""
    if not state.running or state.paused:
        return
    
    state.time_remaining -= 1
    update_displays()
    
    # Sync to Firebase every 5 seconds
    if time.time() - state.last_sync >= 5:
        async_sync()
    
    if state.time_remaining <= 0:
        on_phase_complete()

def on_phase_complete():
    """Handle phase completion and auto-advance"""
    play_sound()
    
    if state.mode == "focus":
        # Focus complete - go to break
        if state.current_session % sessions_before_long == 0:
            start_phase("longBreak")
        else:
            start_phase("shortBreak")
    
    elif state.mode in ["shortBreak", "longBreak"]:
        # Break complete - next session or done
        if state.current_session >= total_sessions:
            # All sessions complete!
            state.mode = "completed"
            state.running = False
            state.time_remaining = 0
            update_displays()
            async_sync()
            async_timeline("COMPLETED")
        else:
            # Start next focus session
            state.current_session += 1
            start_phase("focus")

def start_phase(phase_mode, emit_timeline=True):
    """Start a specific phase. emit_timeline=False to skip timeline event (e.g. when called from START)"""
    state.mode = phase_mode
    state.running = True
    state.paused = False
    state.phase_started_at = time.time()
    
    if phase_mode == "focus":
        state.phase_duration = focus_duration
    elif phase_mode == "shortBreak":
        state.phase_duration = short_break_duration
    elif phase_mode == "longBreak":
        state.phase_duration = long_break_duration
    
    state.time_remaining = state.phase_duration
    update_displays()
    async_sync()
    
    # Timeline event (skip if called from START to avoid race condition)
    if emit_timeline:
        if phase_mode == "focus":
            append_to_timeline("FOCUS")
        elif phase_mode == "shortBreak":
            append_to_timeline("SHORT_BREAK")
        elif phase_mode == "longBreak":
            append_to_timeline("LONG_BREAK")

# =============================================================================
# BUTTON CALLBACKS
# =============================================================================
def on_start_clicked(props, prop):
    """Start button clicked"""
    if state.mode == "ready" or state.mode == "completed":
        state.reset()
        append_to_timeline("START")  # Synchronous call with lock
        start_phase("focus", emit_timeline=False)  # Skip FOCUS event, START is enough
        print("[Pomodoro] Started!")
    return True

def on_pause_clicked(props, prop):
    """Pause/Resume button clicked"""
    if not state.running:
        return True
    
    if state.paused:
        # Resume
        state.paused = False
        state.mode = state.paused_from
        state.phase_started_at = time.time() - (state.phase_duration - state.time_remaining)
        append_to_timeline("RESUME")  # Synchronous
        print("[Pomodoro] Resumed")
    else:
        # Pause
        state.paused = True
        state.paused_from = state.mode
        state.mode = "paused"
        append_to_timeline("PAUSE")  # Synchronous
        print("[Pomodoro] Paused")
    
    update_displays()
    async_sync()
    return True

def on_stop_clicked(props, prop):
    """Stop button clicked"""
    state.reset()
    state.mode = "ready"
    update_displays()
    async_sync()
    append_to_timeline("STOP")  # Synchronous
    print("[Pomodoro] Stopped")
    return True

def on_skip_clicked(props, prop):
    """Skip button clicked"""
    if state.running and not state.paused:
        print(f"[Pomodoro] ⏭️ Skipped {state.mode}")
        on_phase_complete()
    return True

# =============================================================================
# HOTKEY CALLBACKS (for keyboard shortcuts)
# =============================================================================
def on_start(pressed):
    if pressed:
        on_start_clicked(None, None)

def on_pause_resume(pressed):
    if pressed:
        on_pause_clicked(None, None)

def on_stop(pressed):
    if pressed:
        on_stop_clicked(None, None)

def on_skip(pressed):
    if pressed:
        on_skip_clicked(None, None)

# =============================================================================
# OBS SCRIPT INTERFACE
# =============================================================================
def script_description():
    return """<h2>🍅 Pomodoro Timer</h2>
<p>Session-based Pomodoro timer with direct Firebase sync.</p>
<p><b>Use buttons below or set hotkeys in Settings → Hotkeys</b></p>
<hr>
"""

def script_properties():
    props = obs.obs_properties_create()
    
    # =========================================
    # CONTROL BUTTONS (at the top!)
    # =========================================
    obs.obs_properties_add_button(props, "btn_start", "▶️  START", on_start_clicked)
    obs.obs_properties_add_button(props, "btn_pause", "⏸️  PAUSE / RESUME", on_pause_clicked)
    obs.obs_properties_add_button(props, "btn_stop", "⏹️  STOP", on_stop_clicked)
    obs.obs_properties_add_button(props, "btn_skip", "⏭️  SKIP", on_skip_clicked)
    
    # Separator
    obs.obs_properties_add_text(props, "separator1", "", obs.OBS_TEXT_INFO)
    
    # =========================================
    # SETTINGS
    # =========================================
    # Durations
    obs.obs_properties_add_int(props, "focus_min", "Focus Duration (min)", 1, 120, 1)
    obs.obs_properties_add_int(props, "short_break_min", "Short Break (min)", 1, 30, 1)
    obs.obs_properties_add_int(props, "long_break_min", "Long Break (min)", 1, 60, 1)
    obs.obs_properties_add_int(props, "sessions_before_long", "Sessions before Long Break", 1, 10, 1)
    obs.obs_properties_add_int(props, "total_sessions", "Total Sessions", 1, 20, 1)
    
    # Separator
    obs.obs_properties_add_text(props, "separator2", "", obs.OBS_TEXT_INFO)
    
    # Sources
    obs.obs_properties_add_text(props, "mode_source", "Mode Text Source", obs.OBS_TEXT_DEFAULT)
    obs.obs_properties_add_text(props, "timer_source", "Timer Text Source", obs.OBS_TEXT_DEFAULT)
    obs.obs_properties_add_text(props, "session_source", "Session Text Source", obs.OBS_TEXT_DEFAULT)
    
    # Sound
    obs.obs_properties_add_path(props, "sound_file", "Notification Sound", obs.OBS_PATH_FILE, "Audio (*.mp3 *.wav *.ogg)", None)
    
    return props

def script_defaults(settings):
    obs.obs_data_set_default_int(settings, "focus_min", 25)
    obs.obs_data_set_default_int(settings, "short_break_min", 5)
    obs.obs_data_set_default_int(settings, "long_break_min", 15)
    obs.obs_data_set_default_int(settings, "sessions_before_long", 4)
    obs.obs_data_set_default_int(settings, "total_sessions", 8)
    obs.obs_data_set_default_string(settings, "mode_source", "pomodoro_mode")
    obs.obs_data_set_default_string(settings, "timer_source", "pomodoro_timer")
    obs.obs_data_set_default_string(settings, "session_source", "pomodoro_session")

def script_update(settings):
    global focus_duration, short_break_duration, long_break_duration
    global sessions_before_long, total_sessions
    global mode_source, timer_source, session_source, sound_file
    
    focus_duration = obs.obs_data_get_int(settings, "focus_min") * 60
    short_break_duration = obs.obs_data_get_int(settings, "short_break_min") * 60
    long_break_duration = obs.obs_data_get_int(settings, "long_break_min") * 60
    sessions_before_long = obs.obs_data_get_int(settings, "sessions_before_long")
    total_sessions = obs.obs_data_get_int(settings, "total_sessions")
    
    mode_source = obs.obs_data_get_string(settings, "mode_source")
    timer_source = obs.obs_data_get_string(settings, "timer_source")
    session_source = obs.obs_data_get_string(settings, "session_source")
    sound_file = obs.obs_data_get_string(settings, "sound_file")

def script_load(settings):
    """Register hotkeys"""
    obs.obs_hotkey_register_frontend("pomodoro_start", "Pomodoro: Start", on_start)
    obs.obs_hotkey_register_frontend("pomodoro_pause", "Pomodoro: Pause/Resume", on_pause_resume)
    obs.obs_hotkey_register_frontend("pomodoro_stop", "Pomodoro: Stop", on_stop)
    obs.obs_hotkey_register_frontend("pomodoro_skip", "Pomodoro: Skip", on_skip)
    
    # Start timer tick every second
    obs.timer_add(timer_tick, 1000)
    
    # Initial display update
    update_displays()
    async_sync()
    
    print("[Pomodoro] ✅ Script loaded with buttons!")

def script_unload():
    """Cleanup on unload"""
    obs.timer_remove(timer_tick)
    
    # Set offline state
    state.mode = "ready"
    state.running = False
    async_sync()
    
    print("[Pomodoro] Script unloaded")
