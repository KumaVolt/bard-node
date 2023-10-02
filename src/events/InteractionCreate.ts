/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Message as DiscordMessage } from 'discord.js';
import { Client } from '../Client';
import { BotEvent } from '../types';

export default class InteractionCreate implements BotEvent {
    constructor(private client: Client) {}

    public async run(args: any): Promise<void> {
        const [interaction] = args;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.run(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
}
