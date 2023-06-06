import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent, EmbedBuilder, TextChannel } from "discord.js";
import db  from "quick.db"




const event: BotEvent = {
    name: Events.ChannelUpdate, 
    once: false,
    async execute(oldChannel, newChannel) {

        const raidlog = db.get(`raidlog_${oldChannel.guild.id}`);


        const logs = await oldChannel.guild.fetchAuditLogs({limit: 1 ,type: AuditLogEvent.ChannelUpdate });
        if (!logs) return;

        const log = logs.entries.first();
        if (!log) return;

        if (log.executor.id === oldChannel.client.user.id) return;
        if (log.executor.id === oldChannel.guild.ownerId) return;
        if (db.get(`owners_${oldChannel.guild.id}_${log.executor.id}`)) return;
        
        if(db.get(`antichannel_update_${oldChannel.guild.id}`) === true) { 

            if (db.get(`antichannel_updatemax_${oldChannel.guild.id}`) === false) {
            const whitelist = db.get(`whitelist_${oldChannel.guild.id}_${log.executor.id}`) 
            if (!whitelist) {
    
            if (db.get(`sanction_antichannel_update_${oldChannel.guild.id}`) === "kick") {
                oldChannel.guild.members.kick(log.executor.id);
            }
            if (db.get(`sanction_antichannel_update_${oldChannel.guild.id}`) === "ban") {
                oldChannel.guild.members.ban(log.executor.id);
            }
            (client.channels.cache.get(raidlog) as TextChannel).send({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: `AntiChannel Update - ${oldChannel.guild.name}` })
                        .setDescription(`L'utilisateur <@${log.executor.id}> a modifié un salon, il s'est fait **${db.get(`sanction_antichannel_update_${oldChannel.guild.id}`)}** car il n'était pas whitelist.`)
                        .setColor('#2f3136')
                        .setFooter({text:"/antiraid AntiChannelUpdate 'off' pour désactiver"})
                ]
            })

            newChannel.edit({
                name: oldChannel?.name,
                type: oldChannel?.type,
                position: oldChannel?.position || 0,
                parent: oldChannel?.parent,
              });
            
            }  
            }
         
        if (db.get(`antichannel_updatemax_${oldChannel.guild.id}`) === true) {
    
    
        if (db.get(`sanction_antichannel_update_${oldChannel.guild.id}`) === "kick") {
            oldChannel.guild.members.kick(log.executor.id);
        }
        if (db.get(`sanction_antichannel_update_${oldChannel.guild.id}`) === "ban") {
            oldChannel.guild.members.ban(log.executor.id);
        }
        (client.channels.cache.get(raidlog) as TextChannel).send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `AntiChannel Update (Max) - ${oldChannel.guild.name}` })
                    .setDescription(`L'utilisateur <@${log.executor.id}> a modifié un salon, il s'est fait **${db.get(`sanction_antichannel_update_${oldChannel.guild.id}`)}**.`)
                    .setColor('#2f3136')
                    .setFooter({text:"/antiraid AntiChannelUpdate 'off' pour désactiver"})
            ]
        })
        newChannel.edit({
            name: oldChannel?.name,
            type: oldChannel?.type,
            position: oldChannel?.position || 0,
            parent: oldChannel?.parent,
          });
        
        }

        
        }    

          }

    }

    



export default event;