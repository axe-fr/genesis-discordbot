import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent, TextChannel, EmbedBuilder} from "discord.js";
import db  from "quick.db"


const event: BotEvent = {
    name: Events.GuildRoleUpdate, 
    once: false,
    async execute(oldRole, newRole) {

    const logs = await oldRole.guild.fetchAuditLogs({limit: 1 ,type: AuditLogEvent.RoleUpdate});
    if (!logs) return;

    const log = logs.entries.first();
    if (!log) return;

    if (log.executor.id === oldRole.client.user.id) return;


const roleupdatelog = db.get(`roleupdatelog_${oldRole.guild.id}`);
const rolelog = db.get(`rolelog_${oldRole.guild.id}`);


if (roleupdatelog) {
if (roleupdatelog === rolelog) return;

if(oldRole.name != newRole.name) {
(client.channels.cache.get(roleupdatelog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Rôle Update (Logs) - ${oldRole.guild.name}` })
            .setDescription(`L'utilisateur <@${log.executor.id}> a modififé un rôle.`)
            .addFields(
                { name: "Rôle", value: `${newRole}`, inline: false },
                { name: "Modification", value: `Nom`, inline: false },
                { name: `Ancien Nom:`, value: `${oldRole.name}`, inline: true },
                { name: `Nouveau Nom:`, value: `${newRole.name}`, inline: true },
            )
            .setColor('#2f3136')
            .setFooter({text:"RoleUpdate logs"})
    ]
})
  } else if(oldRole.color != newRole.color) {
(client.channels.cache.get(roleupdatelog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Rôle Update (Logs) - ${oldRole.guild.name}` })
            .setDescription(`L'utilisateur <@${log.executor.id}> a modififé un rôle.`)
            .addFields(
                { name: "Rôle", value: `${newRole}`, inline: false },
                { name: "Modification", value: `Couleur`, inline: false },
                { name: `Ancienne couleur:`, value: `${oldRole.color}`, inline: true },
                { name: `Nouvelle couleur:`, value: `${newRole.color}`, inline: true },
            )
            .setColor('#2f3136')
            .setFooter({text:"RoleUpdate logs"})
    ]
})
      } else if(oldRole.permissions != newRole.permissions) {
(client.channels.cache.get(roleupdatelog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Rôle Update (Logs) - ${oldRole.guild.name}` })
            .setDescription(`L'utilisateur <@${log.executor.id}> a modififé un rôle.`)
            .addFields(
                { name: "Rôle", value: `${newRole}`, inline: false },
                { name: "Modification", value: `Permissions`, inline: false },
                { name: `Ancienne permissions:`, value: `${oldRole.permissions}`, inline: true },
                { name: `Nouvelle permissions:`, value: `${newRole.permissions}`, inline: true },)
            .setColor('#2f3136')
            .setFooter({text:"RoleUpdate logs"})
    ]
})
      } else if(oldRole.position != newRole.position) {
(client.channels.cache.get(roleupdatelog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Rôle Update (Logs) - ${oldRole.guild.name}` })
            .setDescription(`L'utilisateur <@${log.executor.id}> a modififé un rôle.`)
            .addFields(
                { name: "Rôle", value: `${newRole}`, inline: false },
                { name: "Modification", value: `Position`, inline: false },
                { name: `Ancienne position:`, value: `${oldRole.position}`, inline: true },
                { name: `Nouvelle position:`, value: `${newRole.position}`, inline: true },
                )
            .setColor('#2f3136')
            .setFooter({text:"RoleUpdate logs"})
    ]
})
      } else if(oldRole.mentionnable != newRole.mentionnable) {
(client.channels.cache.get(roleupdatelog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Rôle Update (Logs) - ${oldRole.guild.name}` })
            .setDescription(`L'utilisateur <@${log.executor.id}> a modififé un rôle.`)
            .addFields(
                { name: "Rôle", value: `${newRole}`, inline: false },
                { name: "Modification", value: `Mode mentionnable`, inline: false },
                { name: `Ancien Mode:`, value: `${oldRole.mode}`, inline: true },
                { name: `Nouveau Mode:`, value: `${newRole.mode}`, inline: true },
            )
            .setColor('#2f3136')
            .setFooter({text:"RoleUpdate logs"})
    ]
})
      } 





  }

  if (rolelog) {
    
   
if(oldRole.name != newRole.name) {
    (client.channels.cache.get(rolelog) as TextChannel).send({
        embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `Rôle Update (Logs) - ${oldRole.guild.name}` })
                .setDescription(`L'utilisateur <@${log.executor.id}> a modififé un rôle.`)
                .addFields(
                    { name: "Rôle", value: `${newRole}`, inline: false },
                    { name: "Modification", value: `Nom`, inline: false },
                    { name: `Ancien Nom:`, value: `${oldRole.name}`, inline: true },
                    { name: `Nouveau Nom:`, value: `${newRole.name}`, inline: true },
                )
                .setColor('#2f3136')
                .setFooter({text:"Roles logs"})
        ]
    })
      } else if(oldRole.color != newRole.color) {
    (client.channels.cache.get(rolelog) as TextChannel).send({
        embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `Rôle Update (Logs) - ${oldRole.guild.name}` })
                .setDescription(`L'utilisateur <@${log.executor.id}> a modififé un rôle.`)
                .addFields(
                    { name: "Rôle", value: `${newRole}`, inline: false },
                    { name: "Modification", value: `Couleur`, inline: false },
                    { name: `Ancienne couleur:`, value: `${oldRole.color}`, inline: true },
                    { name: `Nouvelle couleur:`, value: `${newRole.color}`, inline: true },
                )
                .setColor('#2f3136')
                .setFooter({text:"Roles logs"})
        ]
    })
          } else if(oldRole.position != newRole.position) {
    (client.channels.cache.get(rolelog) as TextChannel).send({
        embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `Rôle Update (Logs) - ${oldRole.guild.name}` })
                .setDescription(`L'utilisateur <@${log.executor.id}> a modififé un rôle.`)
                .addFields(
                    { name: "Rôle", value: `${newRole}`, inline: false },
                    { name: "Modification", value: `Position`, inline: false },
                    { name: `Ancienne position:`, value: `${oldRole.position}`, inline: true },
                    { name: `Nouvelle position:`, value: `${newRole.position}`, inline: true },
                    )
                .setColor('#2f3136')
                .setFooter({text:"Roles logs"})
        ]
    })
          } else if(oldRole.mentionnable != newRole.mentionnable) {
    (client.channels.cache.get(rolelog) as TextChannel).send({
        embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `Rôle Update (Logs) - ${oldRole.guild.name}` })
                .setDescription(`L'utilisateur <@${log.executor.id}> a modififé un rôle.`)
                .addFields(
                    { name: "Rôle", value: `${newRole}`, inline: false },
                    { name: "Modification", value: `Mode mentionnable`, inline: false },
                    { name: `Ancien Mode:`, value: `${oldRole.mode}`, inline: true },
                    { name: `Nouveau Mode:`, value: `${newRole.mode}`, inline: true },
                )
                .setColor('#2f3136')
                .setFooter({text:"Roles logs"})
        ]
    })
      }
    }
}


}

export default event;