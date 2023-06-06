import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent, TextChannel, EmbedBuilder} from "discord.js";
import db  from "quick.db"

const event: BotEvent = {
    name: Events.GuildRoleDelete, 
    once: false,
    async execute(role) {

    const logs = await role.guild.fetchAuditLogs({limit: 1 ,type: AuditLogEvent.RoleDelete});
    if (!logs) return;

    const log = logs.entries.first();
    if (!log) return;

    if (log.executor.id === role.client.user.id) return;


const rolecreatelog = db.get(`roledeletelog_${role.guild.id}`);
const rolelog = db.get(`rolelog_${role.guild.id}`);

if (rolecreatelog) {
if (rolecreatelog ===  rolelog) return;
(client.channels.cache.get(rolecreatelog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Rôle supprimé (Logs) - ${role.guild.name}` })
            .setDescription(`L'utilisateur <@${log.executor.id}> a créé un rôle sur le serveur.`)
            .addFields(
                { name: "Rôle supprimé", value: `${role.name}`, inline: false },
            )
            .setColor('#2f3136')
            .setFooter({text:"RôleDelete logs"})
    ]
})
  }
if (rolelog) {
(client.channels.cache.get(rolelog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Rôle (Logs) - ${role.guild.name}` })
            .setDescription(`L'utilisateur <@${log.executor.id}> a supprimé un rôle sur le serveur.`)
            .addFields(
                { name: "Rôle supprimé", value: `**${role.name}**`, inline: false },
            )
            .setColor('#2f3136')
            .setFooter({text:"Rôle logs"})
    ]
})
  }
}
}

export default event;