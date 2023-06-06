import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent, EmbedBuilder, TextChannel } from "discord.js";
import db  from "quick.db"




const event: BotEvent = {
    name: Events.GuildMemberRemove, 
    once: false,
    async execute(member) {
        const logs = await member.guild.fetchAuditLogs({limit: 1 ,type: AuditLogEvent.MemberKick });
        if (!logs) return;

        const log = logs.entries.first();
        if (!log) return;

        if (log.executor.id === member.client.user.id) return;

      


        if (member.kickable && !member.deleted) {
        if (log.target.id !== member.id) return
            const kicklog = db.get(`kicklog_${member.guild.id}`);
            const modlog = db.get(`modlog_${member.guild.id}`);
            
            if (kicklog) {
            if (kicklog ===  modlog) return;
            (client.channels.cache.get(kicklog) as TextChannel).send({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: `Expulsion (Logs) - ${member.guild.name}` })
                        .setDescription(`L'utilisateur <@${log.executor.id}> a éfféctué une expulsion.`)
                        .addFields(
                            { name: "Utilisateur kick", value: `${member.user.tag}`, inline: false },
                        )
                        .setColor('#2f3136')
                        .setFooter({text:"Kick logs"})
                ]
            })
              }
            if (modlog) {
            (client.channels.cache.get(modlog) as TextChannel).send({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: `Actes de modération (Logs) - ${member.guild.name}` })
                        .setDescription(`L'utilisateur <@${log.executor.id}> a éfféctué une expulsion.`)
                        .addFields(
                            { name: "Utilisateur kick", value: `${member.user.tag}`, inline: false },
                        )
                        .setColor('#2f3136')
                        .setFooter({text:"Modération logs"})
                ]
            })
              }
            }
        }
    }


export default event;

