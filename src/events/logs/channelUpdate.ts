import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent, TextChannel, EmbedBuilder} from "discord.js";
import db  from "quick.db"


const event: BotEvent = {
    name: Events.ChannelUpdate, 
    once: false,
    async execute(oldChannel, newChannel) {

    const logs = await oldChannel.guild.fetchAuditLogs({limit: 1 ,type: AuditLogEvent.ChannelUpdate});
    if (!logs) return;

    const log = logs.entries.first();
    if (!log) return;

    if (log.executor.id === oldChannel.client.user.id) return;


const channelupdatelog = db.get(`channelupdatelog_${oldChannel.guild.id}`);
const channellog = db.get(`channellog_${oldChannel.guild.id}`);

if (channelupdatelog) {
if (channelupdatelog === channellog) return;

if(oldChannel.name != newChannel.name) {
(client.channels.cache.get(channelupdatelog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Channel Update (Logs) - ${oldChannel.guild.name}` })
            .setDescription(`L'utilisateur <@${log.executor.id}> a modififé un salon.`)
            .addFields(
                { name: "Salon", value: `<#${oldChannel.id}>`, inline: false },
                { name: "Modification", value: `Nom`, inline: false },
                { name: `Ancien Nom:`, value: `${oldChannel.name}`, inline: true },
                { name: `Nouveau Nom:`, value: `${newChannel.name}`, inline: true },
            )
            .setColor('#2f3136')
            .setFooter({text:"ChannelUpdate logs"})
    ]
})
  } 
  else if(oldChannel.type != newChannel.type) {
(client.channels.cache.get(channelupdatelog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Channel Update (Logs) - ${oldChannel.guild.name}` })
            .setDescription(`L'utilisateur <@${log.executor.id}> a modififé un salon.`)
            .addFields(
                { name: "Salon", value: `<#${oldChannel.id}>`, inline: false },
                { name: "Modification", value: `Type`, inline: false },
                { name: `Ancien Type:`, value: `${oldChannel.type}`, inline: true },
                { name: `Nouveau Type:`, value: `${newChannel.type}`, inline: true },
            )
            .setColor('#2f3136')
            .setFooter({text:"ChannelUpdate logs"})
    ]
})

  } 
  else if(oldChannel.topic != newChannel.topic) {
(client.channels.cache.get(channelupdatelog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Channel Update (Logs) - ${oldChannel.guild.name}` })
            .setDescription(`L'utilisateur <@${log.executor.id}> a modififé un salon.`)
            .addFields(
                { name: "Salon", value: `<#${oldChannel.id}>`, inline: false },
                { name: "Modification", value: `Topic`, inline: false },
                { name: `Ancien Topic:`, value: `${oldChannel.topic}`, inline: true },
                { name: `Nouveau Topic:`, value: `${newChannel.topic}`, inline: true },
            )
            .setColor('#2f3136')
            .setFooter({text:"Channels logs"})
    ]
})



  }

}


if (channellog) {

if(oldChannel.name != newChannel.name) {
(client.channels.cache.get(channellog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Channels (Logs) - ${oldChannel.guild.name}` })
            .setDescription(`L'utilisateur <@${log.executor.id}> a modififé un salon.`)
            .addFields(
                { name: "Salon", value: `<#${oldChannel.id}>`, inline: false },
                { name: "Modification", value: `Nom`, inline: false },
                { name: `Ancien Nom:`, value: `${oldChannel.name}`, inline: true },
                { name: `Nouveau Nom:`, value: `${newChannel.name}`, inline: true },
            )
            .setColor('#2f3136')
            .setFooter({text:"Channels logs"})
    ]
})
  } 
  else if(oldChannel.type != newChannel.type) {
(client.channels.cache.get(channellog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Channels (Logs) - ${oldChannel.guild.name}` })
            .setDescription(`L'utilisateur <@${log.executor.id}> a modififé un salon.`)
            .addFields(
                { name: "Salon", value: `<#${oldChannel.id}>`, inline: false },
                { name: "Modification", value: `Type`, inline: false },
                { name: `Ancien Type:`, value: `${oldChannel.type}`, inline: true },
                { name: `Nouveau Type:`, value: `${newChannel.type}`, inline: true },
            )
            .setColor('#2f3136')
            .setFooter({text:"Channels logs"})
    ]
})

  } 
  else if(oldChannel.topic != newChannel.topic) {
(client.channels.cache.get(channellog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Channels (Logs) - ${oldChannel.guild.name}` })
            .setDescription(`L'utilisateur <@${log.executor.id}> a modififé un salon.`)
            .addFields(
                { name: "Salon", value: `<#${oldChannel.id}>`, inline: false },
                { name: "Modification", value: `Topic`, inline: false },
                { name: `Ancien Topic:`, value: `${oldChannel.topic}`, inline: true },
                { name: `Nouveau Topic:`, value: `${newChannel.topic}`, inline: true },
            )
            .setColor('#2f3136')
            .setFooter({text:"Channelslogs"})
    ]
})



  }
  }
}
}

export default event;