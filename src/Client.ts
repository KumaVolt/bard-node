import { ClientOptions, Collection, Client as DiscordClient } from 'discord.js';
import { Service } from 'typedi';
import { Logger } from './utils/Logger';
import { BotSettings, BotClient } from './types';
import { Command } from './Command';
import { ActionManager } from './managers/ActionManager';
import { settings as configuration } from './config/config';
import { MusicManager } from './managers/MusicManager';

@Service()
export class Client extends DiscordClient implements BotClient {
    public settings: BotSettings;
    public musicSettings: any;

    constructor(private actionManager: ActionManager, private musicManager: MusicManager) {
        super(configuration.clientOptions || {} as ClientOptions);
        this.settings = configuration;
        this.settings.token = process.env.BOT_TOKEN;
        this.settings.client_id = process.env.BOT_CLIENT_ID;
        this.settings.client_secret = process.env.BOT_CLIENT_SECRET;
        this.settings.music = {
            lavalink_nodes: [
                {
                    host: process.env.LAVALINK_HOST || 'localhost',
                    port: parseInt(process.env.LAVALINK_PORT || '2333'),
                    password: process.env.LAVALINK_PASSWORD || 'youshallnotpass',
                    secure: Boolean(process.env.LAVALINK_SECURE || 'false')
                }
            ],
            defaultVolume: 100,
            paths: {
                events: 'src/music/events',
            }
        }
        if(process.env.BOT_PREFIX) {
            this.settings.prefix = process.env.BOT_PREFIX;
        }

        // Check if token is provided
        if(!this.settings.token) {
            Logger.error('No token provided.');
            process.exit(1);
        }
        this.initialize();
    }

    private async initialize(): Promise<void> {
        try {
            this.actionManager.initializeCommands(this);
            this.actionManager.initializeEvents(this);
            this.musicManager.initializeEvents(this);

            await this.login(configuration.token);
        } catch (e) {
            Logger.error(`Could not initialize bot: ${e}`);
        }
    }

    public initializeMusic()
    {
        this.music_manager = new MusicManager(this);
    }

    public get commands(): Collection<string, Command> {
        return this.actionManager.commands;
    }
}
