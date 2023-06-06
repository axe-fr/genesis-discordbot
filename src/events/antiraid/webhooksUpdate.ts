import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent, TextChannel, EmbedBuilder} from "discord.js";
import db  from "quick.db"


const event: BotEvent = {
    name: Events.WebhooksUpdate, 
    once: false,
    async execute(channel:TextChannel) {
        
        const raidlog = db.get(`raidlog_${channel.guild.id}`);
        const logs = await channel.guild.fetchAuditLogs({limit: 1, type: AuditLogEvent.WebhookCreate });
        if (!logs) return;

        const log = logs.entries.first();
        if (!log) return;

        if (log.executor.id === channel.client.user.id) return;
        if (log.executor.id === channel.guild.ownerId) return;
        if (db.get(`owners_${channel.guild.id}_${log.executor.id}`)) return;
        

        if(db.get(`antiweb_${channel.guild.id}`) === true) { 

        if (db.get(`antiwebmax_${channel.guild.id}`) === false) {
            const whitelist =
            db.get(`whitelist_${channel.guild.id}_${log.executor.id}`) 
        if (!whitelist) {

        if (db.get(`sanction_antiweb_${channel.guild.id}`) === "kick") {
            channel.guild.members.kick(log.executor.id);
        }
        if (db.get(`sanction_antiweb_${channel.guild.id}`) === "ban") {
            channel.guild.members.ban(log.executor.id);
        }
            channel.guild.fetchWebhooks().then((webhooks) => {
            webhooks.forEach((wh) => wh.delete());
          });
          (client.channels.cache.get(raidlog) as TextChannel).send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `AntiWebhook - ${channel.guild.name}` })
                    .setDescription(`L'utilisateur <@${log.executor.id}> a crée un webhook dans le salon <#${channel}>, il s'est fait **${db.get(`sanction_antiweb_${channel.guild.id}`)}** car il n'était pas whitelist.`)
                    .setColor('#2f3136')
                    .setFooter({text:"/antiraid Antiweb 'off' pour désactiver"})
            ]
        })
        
        }  
        }
     
    if (db.get(`antiwebmax_${channel.guild.id}`) === true) {


    if (db.get(`sanction_antiweb_${channel.guild.id}`) === "kick") {
        channel.guild.members.kick(log.executor.id);
    }
    if (db.get(`sanction_antiweb_${channel.guild.id}`) === "ban") {
        channel.guild.members.ban(log.executor.id);
    }
    channel.guild.fetchWebhooks().then((webhooks) => {
        webhooks.forEach((wh) => wh.delete());
      });
      (client.channels.cache.get(raidlog) as TextChannel).send({
        embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `AntiWebhook (Max) - ${channel.guild.name}` })
                .setDescription(`L'utilisateur <@${log.executor.id}> a crée un webhook dans le salon <#${channel}>, il s'est fait **${db.get(`sanction_antiweb_${channel.guild.id}`)}**.`)
                .setColor('#2f3136')
                .setFooter({text:"/antiraid Antiweb 'off' pour désactiver"})
        ]
    })
    
    }

       
    }




    }
        }
    
        



export default event;