import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent ,GuildBan, TextChannel, EmbedBuilder} from "discord.js";
import db  from "quick.db"


const event: BotEvent = {
    name: Events.GuildBanRemove, 
    once: false,
    async execute(ban:GuildBan) {

    const logs = await ban.guild.fetchAuditLogs({limit: 1 ,type: AuditLogEvent.MemberBanRemove});
    if (!logs) return;

    const log = logs.entries.first();
    if (!log) return;

    if (log.executor.id === ban.client.user.id) return;


const unbanlog = db.get(`unbanlog_${ban.guild.id}`);
const modlog = db.get(`modlog_${ban.guild.id}`);

if (unbanlog) {
if (unbanlog ===  modlog) return;
(client.channels.cache.get(unbanlog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Débannissement (Logs) - ${ban.guild.name}` })
            .setDescription(`L'utilisateur <@${log.executor.id}> a éfféctué un débannissement.`)
            .addFields(
                { name: "Utilisateur deban", value: `${ban.user.tag}`, inline: false },
            )
            .setColor('#2f3136')
            .setFooter({text:"UnBan logs"})
    ]
})
  }
if (modlog) {
(client.channels.cache.get(modlog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Actes de modération (Logs) - ${ban.guild.name}` })
            .setDescription(`L'utilisateur <@${log.executor.id}> a éfféctué un débannissement.`)
            .addFields(
                { name: "Utilisateur deban", value: `${ban.user.tag}`, inline: false },
            )
            .setColor('#2f3136')
            .setFooter({text:"Modération logs"})
    ]
})
  }
}
}

export default event;