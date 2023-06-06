import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent ,GuildBan, TextChannel, EmbedBuilder, GuildMember} from "discord.js";
import db  from "quick.db"


const event: BotEvent = {
    name: Events.GuildBanAdd, 
    once: false,
    async execute(ban:GuildBan) {
        const raidlog = db.get(`raidlog_${ban.guild.id}`);

        const logs = await ban.guild.fetchAuditLogs({limit: 1 ,type: AuditLogEvent.MemberBanAdd });
        if (!logs) return;

        const log = logs.entries.first();
        if (!log) return;

        if (log.executor.id === ban.client.user.id) return;
        if (log.executor.id === ban.guild.ownerId) return;
        if (db.get(`owners_${ban.guild.id}_${log.executor.id}`)) return;
        

        if(db.get(`antiban_${ban.guild.id}`) === true) { 


        if (db.get(`antibanmax_${ban.guild.id}`) === false) {
        const whitelist =
        db.get(`whitelist_${ban.guild.id}_${log.executor.id}`) 
        if (!whitelist) {

        if (db.get(`sanction_antiban_${ban.guild.id}`) === "kick") {
            ban.guild.members.kick(log.executor.id);
        }
        if (db.get(`sanction_antiban_${ban.guild.id}`) === "ban") {
            ban.guild.members.ban(log.executor.id);
        }   

        (client.channels.cache.get(raidlog) as TextChannel).send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `AntiBan - ${ban.guild.name}` })
                    .setDescription(`L'utilisateur <@${log.executor.id}> a éfféctué un bannissement, il s'est fait **${db.get(`sanction_antiban_${ban.guild.id}`)}** car il n'était pas whitelist.`)
                    .addFields(
                        { name: "Utilisateur ban", value: `${ban.user.tag}`, inline: false },
                    )
                    .setColor('#2f3136')
                    .setFooter({text:"/antiraid AntiBan 'off' pour désactiver"})
            ]
        })
    
            ban.guild.members.unban(ban.user.id);
        }  
        }
     
    if (db.get(`antibanmax_${ban.guild.id}`) === true) {


    if (db.get(`sanction_antiban_${ban.guild.id}`) === "kick") {
        ban.guild.members.kick(log.executor.id);
    }
    if (db.get(`sanction_antiban_${ban.guild.id}`) === "ban") {
        ban.guild.members.ban(log.executor.id);
    }
    (client.channels.cache.get(raidlog) as TextChannel).send({
        embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `AntiBan (Max) - ${ban.guild.name}` })
                .setDescription(`L'utilisateur <@${log.executor.id}> a éfféctué un bannissement, il s'est fait **${db.get(`sanction_antiban_${ban.guild.id}`)}**`)
                .addFields(
                    { name: "Utilisateur ban", value: `${ban.user.tag}`, inline: false },
                )
                .setColor('#2f3136')
                .setFooter({text:"/antiraid AntiBan 'off' pour désactiver"})
        ]
    })
        ban.guild.members.unban(ban.user.id);
    }

    

   
    


    }
   


    






        }








        }


    
    
        



export default event;

