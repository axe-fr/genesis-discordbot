import { SlashCommandBuilder } from "discord.js"
import { SlashCommand } from "../../types";
import db  from "quick.db"


export const command: SlashCommand = {
    name: 'owner-clear',
    data: new SlashCommandBuilder()
        .setName('owner-clear')
        .setDescription("Supprime tous les owners du serveur"),
    async execute(interaction) {

        if(interaction.guild.ownerId === interaction.user.id) {
            const own = interaction.guild.members.cache.filter(u => db.get(`owners_${interaction.guild.id}_${u.id}`) === u.id)
            if(own) {
                            
            interaction.guild.members.cache.filter(u => db.get(`owners_${interaction.guild.id}_${u.id}`) === u.id).map(a => db.delete(`owners_${interaction.guild.id}_${a.id}`))
            await interaction.reply(`Tous les owners du serveur ont été supprimés`)
            } else {
            interaction.reply({content:"Aucun owner n'est configuré sur le serveur.", ephemeral: true})
            }

        } else {
                await interaction.reply({content:"Tu n'as pas les permissions nécessaire pour éffectuer cette commande. (Tu n'es pas propriètaire)", fetchReply:true, ephemeral:true})
            }
}}

