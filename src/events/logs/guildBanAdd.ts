import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent ,GuildBan, TextChannel, EmbedBuilder} from "discord.js";
import db  from "quick.db"


const event: BotEvent = {
    name: Events.GuildBanAdd, 
    once: false,
    async execute(ban:GuildBan) {

    const logs = await ban.guild.fetchAuditLogs({limit: 1 ,type: AuditLogEvent.MemberBanAdd });
    if (!logs) return;

    const log = logs.entries.first();
    if (!log) return;

    if (log.executor.id === ban.client.user.id) return;


const banlog = db.get(`banlog_${ban.guild.id}`);
const modlog = db.get(`modlog_${ban.guild.id}`);

if (banlog) {
if (banlog ===  modlog) return;
(client.channels.cache.get(banlog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Bannissement (Logs) - ${ban.guild.name}` })
            .setDescription(`L'utilisateur <@${log.executor.id}> a éfféctué un bannissement.`)
            .addFields(
                { name: "Utilisateur ban", value: `${ban.user.tag}`, inline: false },
            )
            .setColor('#2f3136')
            .setFooter({text:"Ban logs"})
    ]
})
  }
if (modlog) {
(client.channels.cache.get(modlog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Actes de modération (Logs) - ${ban.guild.name}` })
            .setDescription(`L'utilisateur <@${log.executor.id}> a éfféctué un bannissement.`)
            .addFields(
                { name: "Utilisateur ban", value: `${ban.user.tag}`, inline: false },
            )
            .setColor('#2f3136')
            .setFooter({text:"Modération logs"})
    ]
})
  }
}
}

export default event;