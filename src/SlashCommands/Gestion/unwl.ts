import { SlashCommandBuilder } from "discord.js"
import { SlashCommand } from "../../types";
import db  from "quick.db"


export const command: SlashCommand = {
    name: 'unwhitelist',
    data: new SlashCommandBuilder()
        .setName('unwhitelist')
        .setDescription("congigure la liste blanche du serveur")
        .addUserOption((option) => {
            return option
                .setName('membre')
                .setDescription('Membre')
                .setRequired(true);
        }),
    async execute(interaction) {
    if(db.get(`owners_${interaction.guild.id}_${interaction.user.id}`) || interaction.guild.ownerId === interaction.user.id ) {

        const member = interaction.options.get('membre').value.toString();
        const datab = db.get(`whitelist_${interaction.guild.id}_${member}`)
        if (!datab === null) {
        interaction.reply({content :`<@${member}> n'est pas whitelist`, ephemeral:true, fetchReply: true}) 
        } else if(datab){
        await db.delete(`whitelist_${interaction.guild.id}_${member}`)
        await interaction.reply({content:`L'utilisateur <@${member}> est éffacé de la liste blanche`})


    
}
} else {
        await interaction.reply({content:"Tu n'as pas les permissions nécessaire pour éffectuer cette commande. (Owners)", fetchReply:true, ephemeral:true})
    }}}

