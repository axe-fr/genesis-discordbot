import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent, EmbedBuilder, TextChannel } from "discord.js";
import db  from "quick.db"




const event: BotEvent = {
    name: Events.ChannelUpdate, 
    once: false,
    async execute(oldRole, newRole) {

        const raidlog = db.get(`raidlog_${oldRole.guild.id}`);


        const logs = await oldRole.guild.fetchAuditLogs({limit: 1 ,type: AuditLogEvent.ChannelUpdate });
        if (!logs) return;

        const log = logs.entries.first();
        if (!log) return;

        if (log.executor.id === oldRole.client.user.id) return;
        if (log.executor.id === oldRole.guild.ownerId) return;
        if (db.get(`owners_${oldRole.guild.id}_${log.executor.id}`)) return;
        
        if(db.get(`antirole_update_${oldRole.guild.id}`) === true) { 

            if (db.get(`antirole_updatemax_${oldRole.guild.id}`) === false) {
            const whitelist = db.get(`whitelist_${oldRole.guild.id}_${log.executor.id}`) 
            if (!whitelist) {
    
            if (db.get(`sanction_antirole_update_${oldRole.guild.id}`) === "kick") {
                oldRole.guild.members.kick(log.executor.id);
            }
            if (db.get(`sanction_antirole_update_${oldRole.guild.id}`) === "ban") {
                oldRole.guild.members.ban(log.executor.id);
            }
            (client.channels.cache.get(raidlog) as TextChannel).send({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: `AntiRole Update - ${oldRole.guild.name}` })
                        .setDescription(`L'utilisateur <@${log.executor.id}> a modifié un rôle, il s'est fait **${db.get(`sanction_antirole_update_${oldRole.guild.id}`)}** car il n'était pas whitelist.`)
                        .setColor('#2f3136')
                        .setFooter({text:"/antiraid AntiRoleUpdate 'off' pour désactiver"})
                ]
            })

            newRole.edit({
                name: oldRole?.name,
                color: oldRole?.color,
                position: oldRole?.position,
                permissions: oldRole?.permissions,
                hoist: oldRole?.hoist,
                mentionable: oldRole?.mentionable,
              });
            
            }  
            }
         
        if (db.get(`antirole_updatemax_${oldRole.guild.id}`) === true) {
    
    
        if (db.get(`sanction_antirole_update_${oldRole.guild.id}`) === "kick") {
            oldRole.guild.members.kick(log.executor.id);
        }
        if (db.get(`sanction_antirole_update_${oldRole.guild.id}`) === "ban") {
            oldRole.guild.members.ban(log.executor.id);
        }
        (client.channels.cache.get(raidlog) as TextChannel).send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `AntiChannel Update (Max) - ${oldRole.guild.name}` })
                    .setDescription(`L'utilisateur <@${log.executor.id}> a modifié un rôle, il s'est fait **${db.get(`sanction_antirole_update_${oldRole.guild.id}`)}**.`)
                    .setColor('#2f3136')
                    .setFooter({text:"/antiraid AntiChannelUpdate 'off' pour désactiver"})
            ]
        })
        newRole.edit({
            name: oldRole?.name,
            color: oldRole?.color,
            position: oldRole?.position,
            permissions: oldRole?.permissions,
            hoist: oldRole?.hoist,
            mentionable: oldRole?.mentionable,
          });
        
        }

        
        }    

          }

    }

    



export default event;