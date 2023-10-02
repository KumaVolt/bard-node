/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Message as DiscordMessage } from 'discord.js';
import { Client } from '../Client';
import { BotEvent } from '../types';

export default class InteractionCreate implements BotEvent {
    constructor(private client: Client) {}

    public async run(args: any): Promise<void> {
        const [interaction] = args;

        this.client.music_manager.updateVoiceState(args);
    }
}
