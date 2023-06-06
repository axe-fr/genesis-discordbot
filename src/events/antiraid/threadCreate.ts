import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent, ThreadChannel, TextChannel, EmbedBuilder} from "discord.js";
import db  from "quick.db"


const event: BotEvent = {
    name: Events.ThreadCreate, 
    once: false,
    async execute(ThreadChannel:ThreadChannel, newlyCreated) {
        
        const raidlog = db.get(`raidlog_${ThreadChannel.guild.id}`);
        const logs = await ThreadChannel.guild.fetchAuditLogs({limit: 1, type: AuditLogEvent.ThreadCreate });
        if (!logs) return;

        const log = logs.entries.first();
        if (!log) return;

        if (log.executor.id === client.user.id) return;
        if (log.executor.id === ThreadChannel.guild.ownerId) return;
        if (db.get(`owners_${ThreadChannel.guild.id}_${log.executor.id}`)) return;
        

        if(db.get(`antithread_${ThreadChannel.guild.id}`) === true) { 

        if (db.get(`antithreadmax_${ThreadChannel.guild.id}`) === false) {
            const whitelist =
            db.get(`whitelist_${ThreadChannel.guild.id}_${log.executor.id}`) 
        if (!whitelist) {

        if (db.get(`sanction_antithread_${ThreadChannel.guild.id}`) === "kick") {
            ThreadChannel.guild.members.kick(log.executor.id);
        }
        if (db.get(`sanction_antithread_${ThreadChannel.guild.id}`) === "ban") {
            ThreadChannel.guild.members.ban(log.executor.id);
        }

          (client.channels.cache.get(raidlog) as TextChannel).send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `AntiThread- ${ThreadChannel.guild.name}` })
                    .setDescription(`L'utilisateur <@${log.executor.id}> a crée un thread, il s'est fait **${db.get(`sanction_antithread_${ThreadChannel.guild.id}`)}** car il n'était pas whitelist.`)
                    .setColor('#2f3136')
                    .setFooter({text:"/antiraid AntiThread 'off' pour désactiver"})
            ]
        })
        
        }  
        }
     
    if (db.get(`antithreadmax_${ThreadChannel.guild.id}`) === true) {


    if (db.get(`sanction_antithread_${ThreadChannel.guild.id}`) === "kick") {
        ThreadChannel.guild.members.kick(log.executor.id);
    }
    if (db.get(`sanction_antithread_${ThreadChannel.guild.id}`) === "ban") {
        ThreadChannel.guild.members.ban(log.executor.id);
    }
    ThreadChannel.delete()
      };
      (client.channels.cache.get(raidlog) as TextChannel).send({
        embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `AntiThread (Max) - ${ThreadChannel.guild.name}` })
                .setDescription(`L'utilisateur <@${log.executor.id}> a crée un thread dans le salon <#${ThreadChannel.id}>, il s'est fait **${db.get(`sanction_antithread_${ThreadChannel.guild.id}`)}**.`)
                .setColor('#2f3136')
                .setFooter({text:"/antiraid AntiThread 'off' pour désactiver"})
        ]
    })
    
    }

       
    }




    }
    
        



export default event;