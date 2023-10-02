import {
    Client,
    TextChannel,
    DMChannel,
    PartialDMChannel,
    StageChannel,
    PrivateThreadChannel,
    PresenceData,
    ClientOptions,
    Guild,
    User,
    Collection,
    NewsChannel,
    MessagePayload,
    MessageCreateOptions,
    PublicThreadChannel,
    VoiceChannel,
    PermissionFlagsBits,
    BitFieldResolvable,
} from 'discord.js';
import { Command } from '../../Command';

export interface BotClient extends Client {
    settings: BotSettings;
    commands: Collection<string, Command>;
}

export interface CommandOptions {
    name: string;
    description?: string;
    usage?: string;
    category?: string;
    cooldown: number;
    requiredPermissions: BitFieldResolvable<keyof typeof PermissionFlagsBits, bigint>[];
}

export interface BotSettings {
    presence: PresenceData;
    clientOptions?: ClientOptions;
    token?: string;
    client_id?: string;
    client_secret?: string;
    prefix: string;
    paths: {
        commands: string;
        events: string;
    };
    music?: {
        lavalink_nodes: {
            host?: string;
            port?: number;
            password?: string;
            secure?: boolean;
        }[];
        defaultVolume: number;
        path: {
            events: string;
        }
    }
    
}

export interface BotEvent {
    run(args?: any[]): void;
}

export interface UserCooldown {
    user: User;
    guild: Guild;
}

export type AnyChannel = TextChannel | DMChannel | PartialDMChannel | StageChannel | PrivateThreadChannel | PublicThreadChannel | VoiceChannel | NewsChannel;
export type EmbedOrMessage = string | MessagePayload | MessageCreateOptions;
