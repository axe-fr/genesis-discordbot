import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent, TextChannel, EmbedBuilder} from "discord.js";
import db  from "quick.db"


const event: BotEvent = {
    name: Events.ChannelCreate, 
    once: false,
    async execute(channel) {

    const logs = await channel.guild.fetchAuditLogs({limit: 1 ,type: AuditLogEvent.ChannelCreate});
    if (!logs) return;

    const log = logs.entries.first();
    if (!log) return;

    if (log.executor.id === channel.client.user.id) return;


const channelcreatelog = db.get(`channelcreatelog_${channel.guild.id}`);
const channellog = db.get(`channellog_${channel.guild.id}`);

if (channelcreatelog) {
if (channelcreatelog === channellog) return;
(client.channels.cache.get(channelcreatelog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Channel create (Logs) - ${channel.guild.name}` })
            .setDescription(`L'utilisateur <@${log.executor.id}> a créé un salon sur le serveur.`)
            .addFields(
                { name: "Salon", value: `<#${channel.id}> ${channel.name}`, inline: false },
            )
            .setColor('#2f3136')
            .setFooter({text:"ChannelCreate logs"})
    ]
})
  }
if (channellog) {
    (client.channels.cache.get(channellog) as TextChannel).send({
        embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `Channels (Logs) - ${channel.guild.name}` })
                .setDescription(`L'utilisateur <@${log.executor.id}> a créé un salon sur le serveur.`)
                .addFields(
                    { name: "Salon", value: `<#${channel.id}> - ${channel.name}`, inline: false },
                )
                .setColor('#2f3136')
                .setFooter({text:"Channels logs"})
        ]
    })
  }
}
}

export default event;