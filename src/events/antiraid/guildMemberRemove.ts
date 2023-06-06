import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent, EmbedBuilder, TextChannel } from "discord.js";
import db  from "quick.db"




const event: BotEvent = {
    name: Events.GuildMemberRemove, 
    once: false,
    async execute(member) {

        const raidlog = db.get(`raidlog_${member.guild.id}`);


        const logs = await member.guild.fetchAuditLogs({limit: 1 ,type: AuditLogEvent.MemberKick });
        if (!logs) return;

        const log = logs.entries.first();
        if (!log) return;

        if (log.executor.id === member.client.user.id) return;
        if (log.executor.id === member.guild.ownerId) return;
        if (db.get(`owners_${member.guild.id}_${log.executor.id}`)) return;


        
        if(db.get(`antikick_${member.guild.id}`) === true) { 
        if (member.kickable && !member.deleted) {
        if (log.target.id !== member.id) return

            if (db.get(`antikickmax_${member.guild.id}`) === false) {
            const whitelist = db.get(`whitelist_${member.guild.id}_${log.executor.id}`) 
            if (!whitelist) {
    
            if (db.get(`sanction_antikick_${member.guild.id}`) === "kick") {
                member.guild.members.kick(log.executor.id);
            }
            if (db.get(`sanction_antikick_${member.guild.id}`) === "ban") {
                member.guild.members.ban(log.executor.id);
            }
            (client.channels.cache.get(raidlog) as TextChannel).send({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: `AntiKick - ${member.guild.name}` })
                        .setDescription(`L'utilisateur <@${log.executor.id}> a éfféctué une expulsion, il s'est fait **${db.get(`sanction_antikick_${member.guild.id}`)}** car il n'était pas whitelist.`)
                        .addFields(
                            { name: "Utilisateur Kick", value: `${member.user.tag}`, inline: false },
                        )
                        .setColor('#2f3136')
                        .setFooter({text:"/antiraid AntiKick 'off' pour désactiver"})
                ]
            })
            
            }  
            }
         
        if (db.get(`antikickmax_${member.guild.id}`) === true) {
    
    
        if (db.get(`sanction_antikick_${member.guild.id}`) === "kick") {
            member.guild.members.kick(log.executor.id);
        }
        if (db.get(`sanction_antikick_${member.guild.id}`) === "ban") {
            member.guild.members.ban(log.executor.id);
        }
        (client.channels.cache.get(raidlog) as TextChannel).send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `AntiKick (Max) - ${member.guild.name}` })
                    .setDescription(`L'utilisateur <@${log.executor.id}> a éfféctué une expulsion, il s'est fait **${db.get(`sanction_antikick_${member.guild.id}`)}**.`)
                    .addFields(
                        { name: "Utilisateur Kick", value: `${member.user.tag}`, inline: false },
                    )
                    .setColor('#2f3136')
                    .setFooter({text:"/antiraid AntiKick 'off' pour désactiver"})
            ]
        })
        }

        
        }    

          }

    }

    }



export default event;

