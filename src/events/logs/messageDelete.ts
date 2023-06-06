import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent, TextChannel, EmbedBuilder} from "discord.js";
import db  from "quick.db"


const event: BotEvent = {
    name: Events.MessageDelete, 
    once: false,
    async execute(message) {

    const logs = await message.guild.fetchAuditLogs({limit: 1 ,type: AuditLogEvent.MessageDelete});
    if (!logs) return;

    const log = logs.entries.first();
    if (!log) return;

    if (log.executor.id === client.user.id) return;


const msgdeletelog = db.get(`msgdeletelog_${message.guild.id}`);
const msglog = db.get(`msglog_${message.guild.id}`);

if (msgdeletelog) {
if (msgdeletelog === msglog) return;
(client.channels.cache.get(msgdeletelog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Messages (Logs) - ${message.guild.name}` })
            .setDescription(`L'utilisateur <@${log.executor.id}> a supprimé un message`)
            .addFields(
            { name: "Salon", value: `<#${message.channel.id}>`, inline: false },
            { name: "Contenu", value: `${message.content}`, inline: false },
            )
            .setColor('#2f3136')
            .setFooter({text:"Messages logs"})
    ]
})
  }
if (msglog) {
    (client.channels.cache.get(msglog) as TextChannel).send({
        embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `Messages (Logs) - ${message.guild.name}` })
                .setDescription(`L'utilisateur <@${log.executor.id}> a supprimé un message`)
                .addFields(
                { name: "Salon", value: `<#${message.channel.id}>`, inline: false },
                { name: "Contenu", value: `${message.content}`, inline: false },
                )
                .setColor('#2f3136')
                .setFooter({text:"Messages logs"})
        ]
    })
  }
}
}

export default event;