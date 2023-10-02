import { ActivityType, GatewayIntentBits } from 'discord.js';
import { BotSettings } from '../types/bot/Bot';
import { MusicSettings } from '../types/bot/music';

export const settings: BotSettings = {
    presence: {
        activities: [
            {
                name: '!help for commands',
                type: ActivityType.Custom
            }
        ]
    },
    clientOptions: {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.MessageContent,
        ]
    },
    prefix: '!',
    paths: {
        commands: 'src/commands',
        events: 'src/events',
    }
};

export const musicSettings: MusicSettings = {
    lavalink_nodes: [
        {
            host: 'localhost',
            port: 2333,
            password: 'youshallnotpass',
            secure: false
        }
    ],
    defaultVolume: 100,
    paths: {
        events: 'src/events',
    }
};

