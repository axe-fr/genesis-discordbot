import { SlashCommandBuilder } from "discord.js"
import { SlashCommand } from "../../types";
import db  from "quick.db"


export const command: SlashCommand = {
    name: 'unowner',
    data: new SlashCommandBuilder()
        .setName('unowner')
        .setDescription("congigure les owners du serveur")
        .addUserOption((option) => {
            return option
                .setName('membre')
                .setDescription('Membre')
                .setRequired(true);
        }),
    async execute(interaction) {

        if(interaction.guild.ownerId === interaction.user.id) {

        const member = interaction.options.get('membre').value.toString();
        const datab = db.get(`owners_${interaction.guild.id}_${member}`)
        if (!datab === null) {
        interaction.reply({content :`<@${member}> n'est pas owner`, ephemeral:true, fetchReply: true}) 
        } else if(datab){
        await db.delete(`owners_${interaction.guild.id}_${member}`)
        await interaction.reply({content:`L'utilisateur <@${member}> est éffacé des owners`}) 
   } 
        } else {
                await interaction.reply({content:"Tu n'as pas les permissions nécessaire pour éffectuer cette commande. (Tu n'es pas propriètaire)", fetchReply:true, ephemeral:true})
            }
}}

