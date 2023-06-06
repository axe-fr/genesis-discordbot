import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events,Guild, AuditLogEvent, TextChannel, EmbedBuilder} from "discord.js";
import db  from "quick.db"

const event: BotEvent = {
    name: Events.GuildUpdate, 
    once: false,
    async execute(oldGuild: Guild, newGuild: Guild) {


        if (oldGuild === newGuild) return;

        const guild = oldGuild; 
        if (!guild) return;

        const logs = await guild.fetchAuditLogs({limit: 1, type: AuditLogEvent.GuildUpdate });
        if (!logs) return;

        const log = logs.entries.first();
        if (!log) return;

        if (log.executor.id === client.user.id) return;
        if (log.executor.id === oldGuild.ownerId) return;
        if (db.get(`owners_${guild.id}_${log.executor.id}`)) return;
     
        const raidlog = db.get(`raidlog_${oldGuild.id}`);

        
        

        if(db.get(`antiguild_${oldGuild.id}`) === true) { 

        if (db.get(`antiguildmax_${oldGuild.id}`) === false) {
            const whitelist =
            db.get(`whitelist_${oldGuild.id}_${log.executor.id}`) 
        if (!whitelist) {

        if (db.get(`sanction_antiguild_${oldGuild.id}`) === "kick") {
            guild.members.kick(log.executor.id);
        }
        if (db.get(`sanction_antiguild_${oldGuild.id}`) === "ban") {
            guild.members.ban(log.executor.id);
        }
          

                
                if (oldGuild.name != newGuild.name) {
                    await newGuild.setName(oldGuild.name)
                }
                if (oldGuild.icon != newGuild.icon) {
                    await newGuild.setIcon(oldGuild.iconURL())
                }
                if (oldGuild.banner != newGuild.banner) {
                    await newGuild.setBanner(oldGuild.bannerURL())
                }
    

                
                        
              }









          ;
          (client.channels.cache.get(raidlog) as TextChannel).send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `AntiGuild - ${oldGuild.name}` })
                    .setDescription(`L'utilisateur <@${log.executor.id}> a modfié le serveur, il s'est fait **${db.get(`sanction_antiguild_${oldGuild.id}`)}** car il n'était pas whitelist.`)
                    .setColor('#2f3136')
                    .setFooter({text:"/antiraid AntiGuild 'off' pour désactiver"})
            ]
        })
        
        }  
        }
     
    if (db.get(`antiguildmax_${oldGuild.id}`) === true) {


    if (db.get(`sanction_antiguild_${oldGuild.id}`) === "kick") {
        guild.members.kick(log.executor.id);
    }
    if (db.get(`sanction_antoguild_${oldGuild.id}`) === "ban") {
        guild.members.ban(log.executor.id);
    }

                    
    if (oldGuild.name != newGuild.name) {
        await newGuild.setName(oldGuild.name)
    }
    if (oldGuild.icon != newGuild.icon) {
        await newGuild.setIcon(oldGuild.iconURL())
    }
    if (oldGuild.banner != newGuild.banner) {
        await newGuild.setBanner(oldGuild.bannerURL())
    }

   
      (client.channels.cache.get(raidlog) as TextChannel).send({
        embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `AntiGuild (Max) - ${oldGuild.name}` })
                .setDescription(`L'utilisateur <@${log.executor.id}> a modfié le serveur, il s'est fait **${db.get(`sanction_antiguild_${oldGuild.id}`)}**.`)
                .setColor('#2f3136')
                .setFooter({text:"/antiraid AntiGuild 'off' pour désactiver"})
        ]
    })
    
    }

       
    }




    }
        
    
        



export default event;