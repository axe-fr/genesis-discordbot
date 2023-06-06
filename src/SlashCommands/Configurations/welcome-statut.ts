import { SlashCommandBuilder } from "discord.js"
import { SlashCommand } from "../../types";
import db  from "quick.db"


export const command: SlashCommand = {
    name: 'welcome-statut',
    data: new SlashCommandBuilder()
   
        .setName('welcome-statut')
        .setDescription("Statut du module"),
    async execute(interaction) {
        const datab = db.get(`welcome_${interaction.guild.id}`);
        if(datab === false) {
        await interaction.reply({ content: `Le salon de bienvenue n'a pas été configuré`, ephemeral:true, fetchReply: true });
        } else {
        await interaction.reply({ content: `Le salon de bienvenue actuel est ${datab}`, fetchReply: true });
        }
        

    }
}