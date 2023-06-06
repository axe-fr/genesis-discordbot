import { SlashCommandBuilder, EmbedBuilder, CommandInteraction, EmbedAssertions } from "discord.js"
import { SlashCommand } from "../../types";
import db from 'quick.db'



export const command: SlashCommand = {
    name: 'settings',
    data: new SlashCommandBuilder()
        .setName("settings")
        .setDescription("Paraèmtres du robot.")
        .addStringOption((option) => {
            return option
                .setName('category')
                .setDescription("Catégorie de paramètres")
                .setRequired(true)
                .addChoices(
                { name: 'Logs', value: 'settings_logs' },
                { name: 'Sécurité', value: 'settings_antiraid' },
                { name: 'Autres', value: 'settings_autres' },
                { name: 'Tous', value: 'settings_all' },
        )}),
        async execute(interaction)  {
        if (!interaction.memberPermissions.has("Administrator")) {
                interaction.reply({ content:"Tu n'as pas la permission d'Administrateur" , ephemeral:true }); 
                } else if(interaction.memberPermissions.has("Administrator")) {

            
        const params = interaction.options.get('category').value.toString();

        
        
        const raidlog = db.get(`raidlog_${interaction.guild.id}`)  
        const joinleavelog = db.get(`joinleavelog_${interaction.guild.id}`)  
        const modlog = db.get(`modlog_${interaction.guild.id}`)  
        const channellog = db.get(`channellog_${interaction.guild.id}`)  
        const msglog = db.get(`msglog_${interaction.guild.id}`)  
        const rolelog = db.get(`rolelog_${interaction.guild.id}`)  
        const weblog = db.get(`weblog_${interaction.guild.id}`)  
        const emojislog = db.get(`emojislog_${interaction.guild.id}`) 
        const voicelog = db.get(`voicelog_${interaction.guild.id}`)  
        const guildlog = db.get(`guildlog_${interaction.guild.id}`) 
        const channelcreatelog = db.get(`channelcreatelog_${interaction.guild.id}`)  
        const rolecreatelog = db.get(`rolecreatelog_${interaction.guild.id}`)
        const emojicreatelog = db.get(`emojicreatelog_${interaction.guild.id}`)  
        const channeldeletelog = db.get(`channeldeletelog_${interaction.guild.id}`)  
        const roledeletelog = db.get(`roledeletelog_${interaction.guild.id}`)  
        const emojideletelog = db.get(`emojideletelog_${interaction.guild.id}`)  
        const roleupdatelog = db.get(`roleupdatelog_${interaction.guild.id}`)  
        const channelupdatelog = db.get(`channelupdatelog_${interaction.guild.id}`)   
        const msgdeletelog = db.get(`msgdeletelog_${interaction.guild.id}`)
        const banlog = db.get(`banlog_${interaction.guild.id}`)  
        const msgupdatelog = db.get(`msgupdatelog_${interaction.guild.id}`)
        const unbanlog = db.get(`unbanlog_${interaction.guild.id}`)  
        const kick = db.get(`kicklog_${interaction.guild.id}`)
        const antiban = db.get(`antiban_${interaction.guild.id}`) 
        const antibanmax = db.get(`antibanmax_${interaction.guild.id}`) 
        const antiunban = db.get(`antiunban_${interaction.guild.id}`) 
        const antiunbanmax = db.get(`antiunbanmax_${interaction.guild.id}`) 
        const antiweb = db.get(`antiweb_${interaction.guild.id}`) 
        const antiwebmax = db.get(`antiwebmax_${interaction.guild.id}`) 
        const antirank = db.get(`antirank_${interaction.guild.id}`) 
        const antirankmax = db.get(`antirankmax_${interaction.guild.id}`) 
        const antiguild = db.get(`antiguild_${interaction.guild.id}`) 
        const antiguildmax = db.get(`antiguildmax_${interaction.guild.id}`) 
        const antibot = db.get(`antibot_${interaction.guild.id}`) 
        const antibotmax = db.get(`antibotmax_${interaction.guild.id}`) 
        const antirolecreate = db.get(`antirole_create_${interaction.guild.id}`) 
        const antirolecreatemax = db.get(`antirole_create_${interaction.guild.id}`)
        const antichannelcreate = db.get(`antichannel_createmax_${interaction.guild.id}`) 
        const antichannelcreatemax = db.get(`antichannel_createmax_${interaction.guild.id}`) 
        const antiroledelete = db.get(`antirole_delete_${interaction.guild.id}`) 
        const antiroledeletemax = db.get(`antirole_deletemax_${interaction.guild.id}`) 
        const antichanneldelete = db.get(`antichannel_delete_${interaction.guild.id}`) 
        const antichanneldeletemax = db.get(`antichannel_deletemax_${interaction.guild.id}`) 
        const antichanneluc = db.get(`antichannel_uc_${interaction.guild.id}`) 
        const antichannelucmax = db.get(`antichannel_ucmax_${interaction.guild.id}`) 
        const antiroleuc = db.get(`antirole_uc_${interaction.guild.id}`) 
        const antiroleucmax = db.get(`antirole_ucmax_${interaction.guild.id}`) 
        const antikick = db.get(`antikick_${interaction.guild.id}`)
        const antikickmax = db.get(`antikickmax_${interaction.guild.id}`) 
        const antilink = db.get(`antilink_${interaction.guild.id}`)
        const antilinkmax = db.get(`antilinkmax_${interaction.guild.id}`)
        const antithread = db.get(`antithread_${interaction.guild.id}`)
        const antithreadmax = db.get(`antithreadmax_${interaction.guild.id}`)
        const welcome = db.get(`welcome_${interaction.guild.id}`)   
        const joinlog = db.get(`joinlog_${interaction.guild.id}`)
        const leavelog = db.get(`leavelog_${interaction.guild.id}`)
            
        const logs1 = new EmbedBuilder()
        .setTitle("Logs/1")
        .addFields(
        { name: "AntiRaid", value: `${raidlog ? `<#${raidlog}>` : "\`Désactivé\`"}`, inline: true},
        { name: "Join & Leave", value: `${joinleavelog ? `<#${joinleavelog}>` : "\`Désactivé\`"}`, inline: true},
        { name: "Actes de modération", value: `${modlog ? `<#${modlog}>` : "\`Désactivé\`"}`, inline: true},
        { name: "Salons", value: `${channellog ? `<#${channellog}>` : "\`Désactivé\`"}`, inline: true},
        { name: "Messages", value: `${msglog ? `<#${msglog}>` : "\`Désactivé\`"}`, inline: true},
        { name: "Rôles", value: `${rolelog ? `<#${rolelog}>` : "\`Désactivé\`"}`, inline: true},
        { name: "Webhooks", value: `${weblog ? `<#${weblog}>` : "\`Désactivé\`"}`, inline: true},
        { name: "Vocaux", value: `${voicelog ? `<#${voicelog}>` : "\`Désactivé\`"}`, inline: true},
        { name: "Emojis", value: `${emojislog ? `<#${emojislog}>` : "\`Désactivé\`"}`, inline: true},
        { name: "Serveur", value: `${guildlog ? `<#${guildlog}>` : "\`Désactivé\`"}`, inline: true},
        )
        .setColor('#2f3136')

        const logs2 = new EmbedBuilder()
        .setTitle("Logs/2")
        .addFields(
        { name: "Join", value: `${joinlog ? `<#${joinlog}>` : "\`Désactivé\`"}`, inline:true},
        { name: "Leave", value: `${leavelog ? `<#${leavelog}>` : "\`Désactivé\`"}`, inline: true},
        { name: "Salon Créé", value: `${channelcreatelog ? `<#${channelcreatelog}>` : "\`Désactivé\`"}`, inline:true},
        { name: "Rôle Crée", value: `${rolecreatelog ? `<#${rolecreatelog}>` : "\`Désactivé\`"}`, inline: true},
        { name: "Emoji Crée", value: `${emojicreatelog ? `<#${emojicreatelog}>` : "\`Désactivé\`"}`, inline: true},
        { name: "Salon Supprimé", value: `${channeldeletelog ? `<#${channeldeletelog}>` : "\`Désactivé\`"}`, inline: true},
        { name: "Rôle Supprimé", value: `${roledeletelog ? `<#${roledeletelog}>` : "\`Désactivé\`"}`, inline: true},
        { name: "Emoji Delete", value: `${emojideletelog ? `<#${emojideletelog}>` : "\`Désactivé\`"}`, inline: true},
        { name: "Message Supprimé", value: `${msgdeletelog ? `<#${msgdeletelog}>` : "\`Désactivé\`"}`, inline: true},
        { name: "Salon Modifié", value: `${channelupdatelog ? `<#${channelupdatelog}>` : "\`Désactivé\`"}`, inline: true},
        { name: "Rôle Modifié", value: `${roleupdatelog ? `<#${roleupdatelog}>` : "\`Désactivé\`"}`, inline: true},
        { name: "Message Modifié", value: `${msgupdatelog ? `<#${msgupdatelog}>` : "\`Désactivé\`"}`, inline: true},
        { name: "Utilisateur Ban", value: `${banlog ? `<#${banlog}>` : "\`Désactivé\`"}`, inline: true},
        { name: "Utilisateur UnBan", value: `${unbanlog ? `<#${unbanlog}>` : "\`Désactivé\`"}`, inline: true},
        { name: "Utilisateur kick", value: `${kick ? `<#${kick}>` : "\`Désactivé\`"}`, inline: true},
        )
        .setColor('#2f3136')


        const secur1 = new EmbedBuilder()
        .setTitle("Sécurité")
        .addFields(
        { name: "AntiBan", value: `${antiban ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiUnBan", value: `${antiunban ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiWebhook", value: `${antiweb ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiRank", value: `${antirank ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiGuildUpdate", value: `${antiguild ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiBot", value: `${antibot ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiRoleCreate", value: `${antirolecreate ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiChannelCreate", value: `${antichannelcreate ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiRoleDelete", value: `${antiroledelete ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiChannelDelete", value: `${antichanneldelete ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiRoleUpdate", value: `${antiroleuc ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiChannelUpdate", value: `${antichanneluc ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiKick", value: `${antikick ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiLink", value: `${antilink ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiThread", value: `${antithread ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        )
        .setColor('#2f3136')

        const secur2 = new EmbedBuilder()
        .setTitle("Sécurité - Maximum")
        .addFields(
        { name: "AntiBan - Max", value: `${antibanmax ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiUnBan - Max", value: `${antiunbanmax ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiWebhook - Max", value: `${antiwebmax ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiRank - Max", value: `${antirankmax ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiGuildUpdate - Max", value: `${antiguildmax ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiBot - Max", value: `${antibotmax ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiRoleCreate - Max", value: `${antirolecreatemax ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiChannelCreate - Max", value: `${antichannelcreatemax ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiRoleDelete - Max", value: `${antiroledeletemax ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiChannelDelete - Max", value: `${antichanneldeletemax ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiRoleUpdate - Max", value: `${antiroleucmax ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiChannelUpdate - Max", value: `${antichannelucmax ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiKick - Max", value: `${antikickmax ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiLink - Max", value: `${antilinkmax ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        { name: "AntiThread - Max", value: `${antithreadmax ? `\`Activé\`` : "\`Désactivé\`"}`, inline: true},
        )
        .setColor('#2f3136')
 
        const util = new EmbedBuilder()
        .setTitle("Autres configurations (Admins)")
        .addFields(
        { name: "Salon de bienvenue", value: `${welcome ? `<#${welcome}>` : "\`Désactivé\`"}`, inline: false },

                    )
                    .setColor('#2f3136')
    if(params == 'settings_logs') {
            await interaction.reply({
            embeds: [logs1, logs2]
        })
    }

    if(params == 'settings_antiraid') {

            await interaction.reply({
            embeds: [secur1, secur2]
        })
    }

    if(params == 'settings_autres') {
            
            await interaction.reply({
            embeds: [util]
        })
    }
    if(params == 'settings_all') {
            
        await interaction.reply({
        embeds: [ secur1, secur2, logs1, logs2, util]
    })
}
                }
    }
}