import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent, TextChannel, EmbedBuilder} from "discord.js";
import db  from "quick.db"


const event: BotEvent = {
    name: Events.MessageBulkDelete, 
    once: false,
    async execute(messages) {

    const logs = await messages.guild.fetchAuditLogs({limit: 1 ,type: AuditLogEvent.MessageBulkDelete});
    if (!logs) return;

    const log = logs.entries.first();
    if (!log) return;

    if (log.executor.id === client.user.id) return;


const messagedeletelog = db.get(`msgdeletelog_${messages.guild.id}`);
const msglog = db.get(`msglog_${messages.guild.id}`);

if (messagedeletelog) {
if (messagedeletelog === msglog) return;
(client.channels.cache.get(messagedeletelog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Messages supprimés  (Logs) - ${messages.guild.name}` })
            .setDescription(`L'utilisateur <@${log.executor.id}> a supprimé plusieurs messages`)
            .addFields(
                { name: "Salon", value: `${messages.channel.name}`, inline: false },
                { name: "Nombre", value: `${messages}`, inline: false },
            )
            .setColor('#2f3136')
            .setFooter({text:"MessageDelete logs"})
    ]
})
  }
if (msglog) {
    (client.channels.cache.get(msglog) as TextChannel).send({
        embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `Messages (Logs) - ${messages.guild.name}` })
                .setDescription(`L'utilisateur <@${log.executor.id}> a supprimé plusieurs messages`)
                .addFields(
                { name: "Salon", value: `${messages.channel.name}`, inline: false },
                { name: "Nombre", value: `${messages}`, inline: false },
                )
                .setColor('#2f3136')
                .setFooter({text:"Messages logs"})
        ]
    })
  }
}
}

export default event;