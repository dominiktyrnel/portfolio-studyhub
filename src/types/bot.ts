
export type BotCommandType = 'command' | 'event' | 'timer';

export interface BotCommand {
    id: string; // Trigger (e.g. !start) or ID
    trigger: string;
    response: string;
    type: BotCommandType;
    cooldown: number;
    enabled: boolean;
    description?: string;
}
