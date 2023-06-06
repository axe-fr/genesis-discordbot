import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent, TextChannel, EmbedBuilder} from "discord.js";
import db  from "quick.db"


const event: BotEvent = {
    name: Events.ChannelDelete, 
    once: false,
    async execute(channel) {

    const logs = await channel.guild.fetchAuditLogs({limit: 1 ,type: AuditLogEvent.ChannelDelete});
    if (!logs) return;

    const log = logs.entries.first();
    if (!log) return;

    if (log.executor.id === channel.client.user.id) return;


const channeldeletelog = db.get(`channeldeletelog_${channel.guild.id}`);
const channellog = db.get(`channellog_${channel.guild.id}`);

if (channeldeletelog) {
if (channeldeletelog === channellog) return;
(client.channels.cache.get(channeldeletelog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Channel delete (Logs) - ${channel.guild.name}` })
            .setDescription(`L'utilisateur <@${log.executor.id}> a supprimé un salon sur le serveur.`)
            .addFields(
                { name: "Salon", value: `${channel.name}`, inline: false },
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
                .setDescription(`L'utilisateur <@${log.executor.id}> a supprimé un salon sur le serveur.`)
                .addFields(
                    { name: "Salon", value: `${channel.name}`, inline: false },
                )
                .setColor('#2f3136')
                .setFooter({text:"Channel logs"})
        ]
    })
  }
}
}

export default event;