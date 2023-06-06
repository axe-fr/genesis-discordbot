import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent, TextChannel, EmbedBuilder} from "discord.js";
import db  from "quick.db"


const event: BotEvent = {
    name: Events.GuildRoleCreate, 
    once: false,
    async execute(role) {

    const logs = await role.guild.fetchAuditLogs({limit: 1 ,type: AuditLogEvent.RoleCreate});
    if (!logs) return;

    const log = logs.entries.first();
    if (!log) return;

    if (log.executor.id === role.client.user.id) return;


const rolecreatelog = db.get(`rolecreatelog_${role.guild.id}`);
const rolelog = db.get(`rolelog_${role.guild.id}`);

if (rolecreatelog) {
if (rolecreatelog ===  rolelog) return;
(client.channels.cache.get(rolecreatelog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Rôle crée (Logs) - ${role.guild.name}` })
            .setDescription(`L'utilisateur <@${log.executor.id}> a créé un rôle sur le serveur.`)
            .addFields(
                { name: "Rôle créé", value: `<@&${role.id}> ${role.id}`, inline: false },
            )
            .setColor('#2f3136')
            .setFooter({text:"RôleCreate logs"})
    ]
})
  }
if (rolelog) {
(client.channels.cache.get(rolelog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Rôles (Logs) - ${role.guild.name}` })
            .setDescription(`L'utilisateur <@${log.executor.id}> a créé un rôle sur le serveur.`)
            .addFields(
                { name: "Rôle créé", value: `<@&${role.id}> ${role.id}`, inline: false },
            )
            .setColor('#2f3136')
            .setFooter({text:"Rôle logs"})
    ]
})
  }
}
}

export default event;