import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder,StringSelectMenuBuilder } from "discord.js";
import { SlashCommand } from "../../types";
import db  from "quick.db"


export const command: SlashCommand = {
    name: 'owners',
    data: new SlashCommandBuilder()
        .setName('owners')
        .setDescription("congigure les owners du serveur")
        .addUserOption((option) => {
            return option
                .setName('membre')
                .setDescription('Membre')
                .setRequired(false);
        }),
    async execute(interaction) {
   
        if(interaction.guild.ownerId === interaction.user.id) {
        const member = interaction.options.get('membre')?.value?.toString();
        let owners = interaction.guild.members.cache.filter(u => db.get(`owners_${interaction.guild.id}_${u.id}`) === u.id).map(a => "<@" + a.user.id + ">")
        if(member) {
        await db.set(`owners_${interaction.guild.id}_${member}`, member)
        await interaction.reply({ content: `L'utilisateur <@${member}> est maintenant owner.`, fetchReply: true });
        } else if(!member){
            if(owners.join("\n")) {
                await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Owners")
                        .setURL("https://discord.gg/genesisbot")
                        .setDescription(`${owners.join("\n")}`)
                        .setColor('#2f3136')
                ],
               
            }) 
        } else {
            interaction.reply({content:"Aucun owner n'est enregistré sur le serveur"});
        }
    }
        } else {
        await interaction.reply({content:"Tu n'as pas les permissions nécessaire pour éffectuer cette commande. (Tu n'es pas propriètaire)", fetchReply:true, ephemeral:true})
            }

}
    }

    
