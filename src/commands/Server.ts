import { Message, PermissionFlagsBits } from 'discord.js';
import { Command } from '../Command';
import { BotClient } from '../types';

export default class Server extends Command {
    constructor(client: BotClient) {
        super(client, {
            name: 'server',
            description: 'Provides information about the server.',
            category: 'Information',
            usage: client.settings.prefix.concat('server'),
            cooldown: 1000,
            requiredPermissions: [PermissionFlagsBits.SendMessages]
        });
    }

    public async run(message: Message): Promise<void> {
        if(!message.guild) return;
        let guild_name = message.guild.name;
        let memberCount = message.guild.memberCount;
        await super.respond(message.channel, `This server is ${guild_name} and has ${memberCount} members.`);
    }
}
