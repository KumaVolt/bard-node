import { Message, PermissionFlagsBits } from 'discord.js';
import { Command } from '../Command';
import { BotClient } from '../types';

export default class Play extends Command {
    constructor(client: BotClient) {
        super(client, {
            name: 'play',
            description: 'Searches and plays the requested song. Supports YouTube, Spotify, Deezer and Apple Music.',
            category: 'Information',
            usage: client.settings.prefix.concat('play'),
            cooldown: 1000,
            requiredPermissions: [PermissionFlagsBits.SendMessages]
        });
    }

    public async run(message: Message): Promise<void> {
        // 
    }
}
