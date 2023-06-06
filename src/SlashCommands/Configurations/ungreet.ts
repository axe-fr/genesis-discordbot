import { SlashCommandBuilder } from "discord.js"
import { SlashCommand } from "../../types";
import db  from "quick.db"


export const command: SlashCommand = {
    name: 'ungreet',
    data: new SlashCommandBuilder()
        .setName('ungreet')
        .setDescription("congigure les salons greet")
        .addChannelOption((option) => {
            return option
                .setName('channel')
                .setDescription('Salon')
                .setRequired(true);
        }),
    async execute(interaction) {
        if (!interaction.memberPermissions.has("Administrator")) {
            interaction.reply({ content:"Tu n'as pas la permission d'Administrateur" , ephemeral:true }); 
            } else if(interaction.memberPermissions.has("Administrator")) {

        const channel = interaction.options.get('channel').value.toString();
        const datab = db.get(`greet_${interaction.guild.id}_${channel}`)
        if (!datab === null) {
        interaction.reply({content :`Le salon <#${channel}> n'est pas greet`, ephemeral:true, fetchReply: true}) 
        } else if(datab){
        await db.delete(`greet_${interaction.guild.id}_${channel}`)
        await interaction.reply({content:`Le salon <#${channel}> est éffacé des salons greet`})


    
}
} }}

