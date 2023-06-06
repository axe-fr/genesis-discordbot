import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../../types";
import db  from "quick.db"


export const command: SlashCommand = {
    name: 'whitelist',
    data: new SlashCommandBuilder()
        .setName('whitelist')
        .setDescription("congigure la liste blanche du serveur")
        .addUserOption((option) => {
            return option
                .setName('membre')
                .setDescription('Membre')
                .setRequired(false);
        }),
    async execute(interaction) {
        if(db.get(`owners_${interaction.guild.id}_${interaction.user.id}`) || interaction.guild.ownerId === interaction.user.id ) {
        const member = interaction.options.get('membre')?.value?.toString();
        let list = interaction.guild.members.cache.filter(u => db.get(`whitelist_${interaction.guild.id}_${u.id}`) === u.id).map(a => "<@" + a.user.id + ">")
        if(member) {
        await db.set(`whitelist_${interaction.guild.id}_${member}`, member)
        await interaction.reply({ content: `L'utilisateur <@${member}> est maintenant dans la liste blanche`, fetchReply: true });
        } else if(!member){

            if(list.join("\n")) {
                await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Whitelist")
                        .setURL("https://discord.gg/genesisbot")
                        .setDescription(`${list.join("\n")}`)
                        .setColor('#2f3136')
                ],
               
            }) 
        } else {
            interaction.reply({content:"Aucun membre n'est enregistré dans la whitelist du serveur"});
        }
    } } else {
        await interaction.reply({content:"Tu n'as pas les permissions nécessaire pour éffectuer cette commande. (Owners)", fetchReply:true, ephemeral:true})
    }
}
    }
