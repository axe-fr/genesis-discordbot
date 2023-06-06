import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent, TextChannel, EmbedBuilder } from "discord.js";
import db  from "quick.db"


const event: BotEvent = {
    name: Events.GuildMemberAdd, 
    once: false,
    async execute(member) {

        const raidlog = db.get(`raidlog_${member.guild.id}`);
        const logs = await member.guild.fetchAuditLogs({limit: 1 ,type: AuditLogEvent.BotAdd });
        if (!logs) return;

        const log = logs.entries.first();
        if (!log) return;

        if (log.executor.id === member.client.user.id) return;
        if (log.executor.id === member.guild.ownerId) return;
        if (db.get(`owners_${member.guild.id}_${log.executor.id}`)) return;


        if(db.get(`antibot_${member.guild.id}`) === true) { 
        if (member.user.bot) {


            if (db.get(`antibotmax_${member.guild.id}`) === false) {
            const whitelist = db.get(`whitelist_${member.guild.id}_${log.executor.id}`) 
            if (!whitelist) {
    
            if (db.get(`sanction_antibot_${member.guild.id}`) === "kick") {
                member.guild.members.kick(log.executor.id);
            }
            if (db.get(`sanction_antibot_${member.guild.id}`) === "ban") {
                member.guild.members.ban(log.executor.id);
            }
            (client.channels.cache.get(raidlog) as TextChannel).send({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: `AntiBot - ${member.guild.name}` })
                        .setDescription(`L'utilisateur <@${log.executor.id}> a ajouté un bot, il s'est fait **${db.get(`sanction_antibot_${member.guild.id}`)}** car il n'était pas whitelist.`)
                        .addFields(
                            { name: "Bot ajouté", value: `${member.user.tag}`, inline: false },
                        )
                        .setColor('#2f3136')
                        .setFooter({text:"/antiraid AntiBot 'off' pour désactiver"})
                ]
            })
            member.guild.members.ban(member.id);
            
            }  
            }
         
        if (db.get(`antibotmax_${member.guild.id}`) === true) {
    
    
        if (db.get(`sanction_antibot_${member.guild.id}`) === "kick") {
            member.guild.members.kick(log.executor.id);
        }
        if (db.get(`sanction_antibot_${member.guild.id}`) === "ban") {
            member.guild.members.ban(log.executor.id);
        }
        (client.channels.cache.get(raidlog) as TextChannel).send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `AntiBot (Max) - ${member.guild.name}` })
                    .setDescription(`L'utilisateur <@${log.executor.id}> a ajouté un bot, il s'est fait **${db.get(`sanction_antibot_${member.guild.id}`)}**`)
                    .addFields(
                        { name: "Bot ajouté", value: `${member.user.tag}`, inline: false },
                    )
                    .setColor('#2f3136')
                    .setFooter({text:"/antiraid AntiBot 'off' pour désactiver"})
            ]
        })
                    member.guild.members.ban(member.id);
        }

        
        }    

          }

    }

    }



export default event;

