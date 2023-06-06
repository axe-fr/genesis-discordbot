import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../../types";
import db  from "quick.db"


export const command: SlashCommand = {
    name: 'greet',
    data: new SlashCommandBuilder()
        .setName('greet')
        .setDescription("congigure le système de ghostping")
        .addChannelOption((option) => {
            return option
                .setName('channel')
                .setDescription('Salon')
                .setRequired(false);
        }),
    async execute(interaction) {
        if (!interaction.memberPermissions.has("Administrator")) {
            interaction.reply({ content:"Tu n'as pas la permission d'Administrateur" , ephemeral:true }); 
            } else if(interaction.memberPermissions.has("Administrator")) {
        const channel = interaction.options.get('channel')?.value?.toString();
        let list = interaction.guild.channels.cache.filter(c => db.get(`greet_${interaction.guild.id}_${c.id}`) === c.id).map(a => "<#" + a.id + ">")
        if(channel) {
        await db.set(`greet_${interaction.guild.id}_${channel}`, channel)
        await db.set(`greetsettings_${interaction.guild.id}`, true)
        await interaction.reply({ content: `Le salon <#${channel}> est maintenant dans la liste des salons ghostping`, fetchReply: true });
        } else if(!channel){

            if(list.join("\n")) {
            await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Salon Ghost Ping")
                    .setURL("https://discord.gg/genesisbot")
                    .setDescription(`${list.join("\n")}`)
                    .setColor('#2f3136')
            ],
           
        }) 
    } else {
        interaction.reply({content:"Aucun salon n'est greet"});
    }
    }}
}
    }
