import { SlashCommandBuilder, EmbedBuilder, CommandInteraction } from "discord.js"
import { SlashCommand } from "../../types";
import  db from "quick.db"

export const command: SlashCommand = {
    name: 'punitions',
    data: new SlashCommandBuilder()
        .setName("punitions")
        .setDescription("Configure les punitions des modules de sécurité")
        .addStringOption((option) => {
            return option
                .setName('module')
                .setDescription("Module d'antiraid")
                .setRequired(true)
                .addChoices(
                { name: 'AntiBan', value: 'antiban' },
                { name: 'AntiUnban', value: 'antiunban' },
                { name: 'AntiWebhook', value: 'antiweb' },
                { name: 'AntiRank', value: 'antirank' },
                { name: 'AntiGuildUpdate', value: 'antiguild' },
                { name: 'AntiBot', value: 'antibot' },
                { name: 'AntiRoleCreate', value: 'antirole_create' },
                { name: 'AntiChannelCreate', value: 'antichannel_create' },
                { name: 'AntiRoleDelete', value: 'antirole_delete' },
                { name: 'AntiChannelDelete', value: 'antichannel_delete' },
                { name: 'AntiRoleUpdate', value: 'antirole_uc' },
                { name: 'AntiChannelUpdate', value: 'antichannel_uc' },
                { name: 'AntiLink', value: 'antiilink' },
                { name: 'AntiKick', value: 'antiKick' },
                { name: 'AntiThread', value: 'antithread' },

        )})
        .addStringOption((option) => {
            return option
                .setName('punition')
                .setDescription("Type de punition")
                .setRequired(true)
                .addChoices(
                { name: 'Kick', value: 'punish_kick' },
                { name: 'Ban', value: 'punish_ban' },
                { name: 'Statut', value: 'punish_statut' },
                //{ name: 'Derank', value: 'punish_derank' },
                //{ name: 'Aucune', value:'punish_0'}

        )}),
    async execute(interaction) {
    const secur = interaction.options.get('module').value.toString();
    const type = interaction.options.get('punition').value.toString();
    if(db.get(`owners_${interaction.guild.id}_${interaction.user.id}`) || interaction.guild.ownerId === interaction.user.id ) {


    if(type === "punish_kick") {
        await db.set(`sanction_${secur}_${interaction.guild.id}`, "kick" ) 
        await interaction.reply({content:`La punition du module d'antiraid **${secur}** est dès maintenant __kick__`, ephemeral:false, fetchReply:true})
    }
    if(type === "punish_ban") {
        await db.set(`sanction_${secur}_${interaction.guild.id}`, "ban" )
        await interaction.reply({content:`La punition du module d'antiraid **${secur}** est dès maintenant __ban__`, ephemeral:false, fetchReply:true})       
    }

    if(type === "punish_statut") {
        await interaction.reply({content:`La punition du module d'antiraid **${secur}** à été configurée sur ${db.get(`sanction_${secur}_${interaction.guild.id}`)}`, ephemeral:false, fetchReply:true})       
    }




} else {
    await interaction.reply({content:"Tu n'as pas les permissions nécessaire pour éffectuer cette commande. (Owners)", fetchReply:true, ephemeral:true})
}

}
}