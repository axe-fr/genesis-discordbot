import { SlashCommandBuilder, EmbedBuilder, CommandInteraction } from "discord.js"
import { SlashCommand } from "../../types";
import  db from "quick.db"

export const command: SlashCommand = {
    name: 'antiraid',
    data: new SlashCommandBuilder()
        .setName("antiraid")
        .setDescription("Configure la sécurité")
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
                { name: 'AntiKick', value: 'antikick' },
                { name: 'AntiLink', value: 'antiilink' },
                { name: 'AntiThread', value: 'antithread' },

        )})
        .addStringOption((option) => {
            return option
                .setName('type')
                .setDescription("Type d'action/configuration")
                .setRequired(true)
                .addChoices(
                { name: 'Statut', value: 'antiraid_statut' },
                { name: 'Activer', value: 'antiraid_on' },
                { name: 'Désactiver', value: 'antiraid_off' },
                { name: 'Maximum', value: 'antiraid_max' },
        )}),
    async execute(interaction) {
    if(db.get(`owners_${interaction.guild.id}_${interaction.user.id}`) || interaction.guild.ownerId === interaction.user.id ) {


    const secur = interaction.options.get('module').value.toString();
    const type = interaction.options.get('type').value.toString();

        if(type === "antiraid_max") {
            await db.set(`${secur}_${interaction.guild.id}`, true);
            await db.set(`${secur}max_${interaction.guild.id}`, true);
            
            if(!db.get(`sanction_${secur}_${interaction.guild.id}`)) await db.set(`sanction_${secur}_${interaction.guild.id}`, "ban");

            await db.set(`sanction_${secur}_${interaction.guild.id}`, "ban");
            await interaction.reply({content:` Le module d'antiraid **${secur}** est maintenant activé au maximum, les  membres présents dans la whitelist seront affecté par la sanction configuré.`, ephemeral:false, fetchReply:true})
        }
        if(type === "antiraid_on") {
            await db.set(`${secur}_${interaction.guild.id}`, true);
            await db.set(`${secur}max_${interaction.guild.id}`, false);
            await db.set(`sanction_${secur}_${interaction.guild.id}`, "kick");
            await interaction.reply({content:` Le module d'antiraid **${secur}** est maintenant activé sur le serveur.`, ephemeral:false, fetchReply:true})
        }
        if(type === "antiraid_off") {
            await db.set(`${secur}_${interaction.guild.id}`, false);
            await db.set(`${secur}max_${interaction.guild.id}`, false);
            await interaction.reply({content:` Le module d'antiraid **${secur}** est maintenant désactivé.`, ephemeral:false, fetchReply:true})
        }
        if(type === "antiraid_statut") {

        const statut = db.get(`${secur}_${interaction.guild.id}`);
        const statutmax = db.get(`${secur}max_${interaction.guild.id}`);
        const content = statut ? "activé" : "désactivé"
        const contentmax = statutmax ? "activé" : "désactivé"

            await interaction.reply({content:` Le module d'antiraid **${secur}** est __${content}__, le mode max est __${contentmax}__.`, ephemeral:false, fetchReply:true})
        }



    } else {
        await interaction.reply({content:"Tu n'as pas les permissions nécessaire pour éffectuer cette commande. (Owners)", fetchReply:true, ephemeral:true})
    }
}
}