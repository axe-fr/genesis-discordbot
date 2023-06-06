import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent, EmbedBuilder, TextChannel } from "discord.js";
import db  from "quick.db"




const event: BotEvent = {
    name: Events.ChannelDelete, 
    once: false,
    async execute(channel) {

        const raidlog = db.get(`raidlog_${channel.guild.id}`);


        const logs = await channel.guild.fetchAuditLogs({limit: 1 ,type: AuditLogEvent.ChannelDelete });
        if (!logs) return;

        const log = logs.entries.first();
        if (!log) return;

        if (log.executor.id === channel.client.user.id) return;
        if (log.executor.id === channel.guild.ownerId) return;
        if (db.get(`owners_${channel.guild.id}_${log.executor.id}`)) return;
        
        if(db.get(`antichannel_create_${channel.guild.id}`) === true) { 

            if (db.get(`antichannel_createmax_${channel.guild.id}`) === false) {
            const whitelist = db.get(`whitelist_${channel.guild.id}_${log.executor.id}`) 
            if (!whitelist) {
    
            if (db.get(`sanction_antichannel_create_${channel.guild.id}`) === "kick") {
                channel.guild.members.kick(log.executor.id);
            }
            if (db.get(`sanction_antichannel_create_${channel.guild.id}`) === "ban") {
                channel.guild.members.ban(log.executor.id);
            }
            (client.channels.cache.get(raidlog) as TextChannel).send({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: `AntiChannel Delete - ${channel.guild.name}` })
                        .setDescription(`L'utilisateur <@${log.executor.id}> a supprimé un salon, il s'est fait **${db.get(`sanction_antichannel_delete_${channel.guild.id}`)}** car il n'était pas whitelist.`)
                        .setColor('#2f3136')
                        .setFooter({text:"/antiraid AntiChannelDelete 'off' pour désactiver"})
                ]
            })
            channel.guild.channel.create({
                ...channel,
                parent_id: channel.parent_id,
                reason: "Anti-ChannelDelete"
            })
            }  
            }
         
        if (db.get(`antichannel_deletemax_${channel.guild.id}`) === true) {
    
    
        if (db.get(`sanction_antichannel_delete_${channel.guild.id}`) === "kick") {
            channel.guild.members.kick(log.executor.id);
        }
        if (db.get(`sanction_antichannel_delete_${channel.guild.id}`) === "ban") {
            channel.guild.members.ban(log.executor.id);
        }
        (client.channels.cache.get(raidlog) as TextChannel).send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `AntiChannel Delete (Max) - ${channel.guild.name}` })
                    .setDescription(`L'utilisateur <@${log.executor.id}> a supprimé un salon, il s'est fait **${db.get(`sanction_antichannel_delete_${channel.guild.id}`)}**.`)
                    .setColor('#2f3136')
                    .setFooter({text:"/antiraid AntiChannelDelete 'off' pour désactiver"})
            ]
        })
        channel.guild.channel.create({
            ...channel,
            parent_id: channel.parent_id,
            reason: "Anti-ChannelDelete"
        })
        
        }

        
        }    

          }

    }

    



export default event;