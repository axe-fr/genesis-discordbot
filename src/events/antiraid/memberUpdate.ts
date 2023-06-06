import { BotEvent } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent, EmbedBuilder, TextChannel, GuildMember } from "discord.js";
import db  from "quick.db"


const event: BotEvent = {
    name: Events.GuildMemberUpdate, 
    once: false,
    async execute(oldMember:GuildMember, newMember:GuildMember) {

    


        const raidlog = db.get(`raidlog_${oldMember.guild.id}`);
        const logs = await oldMember.guild.fetchAuditLogs({limit: 1, type: AuditLogEvent.MemberRoleUpdate });
        if (!logs) return;

        const log = logs.entries.first();
        if (!log) return;

        if (log.executor.id === client.user.id) return;
        if (log.executor.id === oldMember.guild.ownerId) return;
        if (db.get(`owners_${oldMember.guild.id}_${log.executor.id}`)) return;
        
        if(oldMember.roles === newMember.roles) return;


        if(db.get(`antirank_${oldMember.guild.id}`) === true) { 



        if (db.get(`antirankmax_${oldMember.guild.id}`) === false) {
            const whitelist =
            db.get(`whitelist_${oldMember.guild.id}_${log.executor.id}`) 
        if (!whitelist) {

        if (db.get(`sanction_antirank_${oldMember.guild.id}`) === "kick") {
            oldMember.guild.members.kick(log.executor.id);
        }
        if (db.get(`sanction_antirank_${oldMember.guild.id}`) === "ban") {
            oldMember.guild.members.ban(log.executor.id);
        }

        newMember.roles.set(oldMember.roles.cache);


          (client.channels.cache.get(raidlog) as TextChannel).send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `AntiRank- ${oldMember.guild.name}` })
                    .setDescription(`L'utilisateur <@${log.executor.id}> a donné un rôle, il s'est fait **${db.get(`sanction_antirank_${oldMember.guild.id}`)}** car il n'était pas whitelist.`)
                    .addFields(
                        { name: "Membre:", value: `<@${newMember.user.id}>` },
                    )
                    .setColor('#2f3136')
                    .setFooter({text:"/antiraid AntiRank 'off' pour désactiver"})
            ]
        })
        
        }  
        }
     
    if (db.get(`antirankmax_${oldMember.guild.id}`) === true) {


    if (db.get(`sanction_antirank_${oldMember.guild.id}`) === "kick") {
        oldMember.guild.members.kick(log.executor.id);
    }
    if (db.get(`sanction_antirank_${oldMember.guild.id}`) === "ban") {
        oldMember.guild.members.ban(log.executor.id);
    }
    
      
      newMember.roles.set(oldMember.roles.cache);



          (client.channels.cache.get(raidlog) as TextChannel).send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `AntiRank- ${oldMember.guild.name}` })
                    .setDescription(`L'utilisateur <@${log.executor.id}> a donné un rôle, il s'est fait **${db.get(`sanction_antirank_${oldMember.guild.id}`)}**`)
                    .addFields(
                        { name: "Membre:", value: `<@${newMember.user.id}>` },
                    )
                    .setColor('#2f3136')
                    .setFooter({text:"/antiraid AntiRank 'off' pour désactiver"})
            ]
        })
    
    };
}

       
    }


    }

        



export default event;