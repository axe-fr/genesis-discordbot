import { SlashCommandBuilder } from "discord.js"
import { SlashCommand } from "../../types";
import db  from "quick.db"


export const command: SlashCommand = {
    name: 'greet-clear',
    data: new SlashCommandBuilder()
        .setName('greet-clear')
        .setDescription("Supprime tous salons greet"),
    async execute(interaction) {

        if(interaction.guild.ownerId === interaction.user.id) {
            const greet = interaction.guild.channels.cache.filter(c => db.get(`greet_${interaction.guild.id}_${c.id}`) === c.id)
        
            if(greet) {          
            interaction.guild.channels.cache.filter(c => db.get(`greet_${interaction.guild.id}_${c.id}`) === c.id).map(a => db.delete(`greet_${interaction.guild.id}_${a.id}`))
            await interaction.reply(`Tous les salons greets ont été supprimés de la base de donnée`)
            } else {
            interaction.reply({content:"Aucun salon greet configuré", ephemeral: true})
            }

        } else {
                await interaction.reply({content:"Tu n'as pas les permissions nécessaire pour éffectuer cette commande. (Tu n'es pas propriètaire)", fetchReply:true, ephemeral:true})
            }
}}

