import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../../types";
import db  from "quick.db"


export const command: SlashCommand = {
    name: 'welcome',
    data: new SlashCommandBuilder()
        .setName('welcome')
        .setDescription("congigure le salon de bienvenue.")
        .addChannelOption((option) => {
            return option
                .setName('salon')
                .setDescription('Salon de bienvenue')
                .setRequired(true);
        }),
    async execute(interaction) {
        if (!interaction.memberPermissions.has("Administrator")) {
            interaction.reply({ content:"Tu n'as pas la permission d'Administrateur" , ephemeral:true }); 
            } else if(interaction.memberPermissions.has("Administrator")) {

        const salon = interaction.options.get('salon')?.value?.toString();
        const welcome = db.get(`welcome_${interaction.guild.id}`)
        if(salon) {
        await db.set(`welcome_${interaction.guild.id}`, salon)
        await interaction.reply({ content: `Le salon de bienvenue a été configuré sur <#${salon}>`, fetchReply: true });
        } else if(!salon){
            await interaction.reply({

            embeds: [
                new EmbedBuilder()
                    .setTitle("Salon configuré")
                    .setURL("https://discord.gg/genesisbot")
                    .setDescription(`Salon de bienvenue : <#${welcome}>`)
                    .setColor('#2f3136')
            ],
           
        }) 
        } else {
            await interaction.reply({content:`Le salon n'a pas été configuré`, ephemeral:true, fetchReply:true})
        }
    }


}
}