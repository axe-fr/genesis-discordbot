import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent, EmbedBuilder, TextChannel } from "discord.js";
import db  from "quick.db"



const event: BotEvent = {
    name: Events.GuildRoleCreate, 
    once: false,
    async execute(role) {

        const raidlog = db.get(`raidlog_${role.guild.id}`);


        const logs = await role.guild.fetchAuditLogs({limit: 1 ,type: AuditLogEvent.RoleCreate });
        if (!logs) return;

        const log = logs.entries.first();
        if (!log) return;

        if (log.executor.id === role.client.user.id) return;
        if (log.executor.id === role.guild.ownerId) return;
        if (db.get(`owners_${role.guild.id}_${log.executor.id}`)) return;
        
        if(db.get(`antirole_create_${role.guild.id}`) === true) { 

            if (db.get(`antirole_createmax_${role.guild.id}`) === false) {
            const whitelist = db.get(`whitelist_${role.guild.id}_${log.executor.id}`) 
            if (!whitelist) {
    
            if (db.get(`sanction_antirole_create_${role.guild.id}`) === "kick") {
                role.guild.members.kick(log.executor.id);
            }
            if (db.get(`sanction_antirole_create_${role.guild.id}`) === "ban") {
                role.guild.members.ban(log.executor.id);
            }
            (client.channels.cache.get(raidlog) as TextChannel).send({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: `AntiRole Create - ${role.guild.name}` })
                        .setDescription(`L'utilisateur <@${log.executor.id}> a créé un rôle, il s'est fait **${db.get(`sanction_antirole_create_${role.guild.id}`)}** car il n'était pas whitelist.`)
                        .setColor('#2f3136')
                        .setFooter({text:"/antiraid AntiRoleCreate 'off' pour désactiver"})
                ]
            })
            role.delete()
            }  
            }
         
        if (db.get(`antirole_createmax_${role.guild.id}`) === true) {
    
    
        if (db.get(`sanction_antirole_create_${role.guild.id}`) === "kick") {
            role.guild.members.kick(log.executor.id);
        }
        if (db.get(`sanction_antirole_create_${role.guild.id}`) === "ban") {
            role.guild.members.ban(log.executor.id);
        }
        (client.channels.cache.get(raidlog) as TextChannel).send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `AntiRole Create (Max) - ${role.guild.name}` })
                    .setDescription(`L'utilisateur <@${log.executor.id}> a créé un rôle, il s'est fait **${db.get(`sanction_antirole_create_${role.guild.id}`)}**.`)
                    .setColor('#2f3136')
                    .setFooter({text:"/antiraid AntiRoleCreate 'off' pour désactiver"})
            ]
        })
        role.delete()
        
        }

        
        }    

          }

    }

    



export default event;
