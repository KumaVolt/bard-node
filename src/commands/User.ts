import { Message, PermissionFlagsBits } from 'discord.js';
import { Command } from '../Command';
import { BotClient } from '../types';

export default class User extends Command {
    constructor(client: BotClient) {
        super(client, {
            name: 'user',
            description: 'Provides information about the user.',
            category: 'Information',
            usage: client.settings.prefix.concat('user'),
            cooldown: 1000,
            requiredPermissions: [PermissionFlagsBits.SendMessages]
        });
    }

    public async run(message: Message): Promise<void> {
        if(!message.member) return;
        let channel = message.channel;
        let author_name = message.author.username;
        let author_joined_at = message.member.joinedAt;
        await super.respond(channel, `This command was run by ${author_name}, who joined on ${author_joined_at}.`);
    }
}
