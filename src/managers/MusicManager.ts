import { Collection, Routes } from 'discord.js';
import { Service } from 'typedi';
import { join } from 'path';
import { readdir, statSync } from 'fs';
import { BotClient } from '../types/bot/Bot';
import { Command } from '../Command';
import { Logger } from '../utils/Logger';
import { MoonlinkManager } from 'moonlink.js';

@Service()
export class MusicManager {
    public client?: MoonlinkManager;

    /**
     * Initializes every event from the configured event path.
     * @param {BotClient} client The original client, for access to the configuration.
     */
    public initializeEvents(client: BotClient): void {
        const { events } = client.settings.paths;

        readdir(events, (err, files) => {
            if (err) Logger.error(err);

            files.forEach(evt => {
                const Event: any = require(join(
                    __dirname,
                    '../../',
                    `${events}/${evt.replace('ts', 'js')}`
                )).default;

                const event = new Event(client);
                const eventName = evt.split('.')[0];

                console.log( eventName.charAt(0).toLowerCase() + eventName.slice(1));

                client.on(
                    eventName.charAt(0).toLowerCase() + eventName.slice(1),
                    (...args: string[]) => event.run(args)
                );
            });
        });
    }
}
