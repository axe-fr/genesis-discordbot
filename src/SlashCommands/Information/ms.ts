import { SlashCommandBuilder } from "discord.js"
import { SlashCommand } from "../../types";

export const command: SlashCommand = {
    name: 'ms',
    data: new SlashCommandBuilder()
        .setName("ms")
        .setDescription("Affiche le ping du bot"),
        async execute(interaction)  {
        await interaction.reply(`\`\`${interaction.client.ws.ping} ms\`\``)

            
    }
}