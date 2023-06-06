import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent, EmbedBuilder, TextChannel } from "discord.js";
import db  from "quick.db"




const event: BotEvent = {
    name: Events.ChannelDelete, 
    once: false,
    async execute(channel) {

        if(channel.id == db.get(`raidlog_${channel.guild.id}`)) return db.delete(`raidlog_${channel.guild.id}`);
        if(channel.id == db.get(`joinleavelog_${channel.guild.id}`)) return db.delete(`joinleavelog_${channel.guild.id}`);
        if(channel.id == db.get(`modlog_${channel.guild.id}`)) return db.delete(`modlog_${channel.guild.id}`);
        if(channel.id == db.get(`channellog_${channel.guild.id}`)) return db.delete(`channellog_${channel.guild.id}`);
        if(channel.id == db.get(`msglog_${channel.guild.id}`)) return db.delete(`msglog_${channel.guild.id}`);
        if(channel.id == db.get(`rolelog_${channel.guild.id}`)) return db.delete(`rolelog_${channel.guild.id}`);
        if(channel.id == db.get(`weblog_${channel.guild.id}`)) return db.delete(`weblog_${channel.guild.id}`);
        if(channel.id == db.get(`voicelog_${channel.guild.id}`)) return db.delete(`voicelog_${channel.guild.id}`);
        if(channel.id == db.get(`guildlog_${channel.guild.id}`)) return db.delete(`guildlog_${channel.guild.id}`);
        if(channel.id == db.get(`emojislog_${channel.guild.id}`)) return db.delete(`emojislog_${channel.guild.id}`);
        if(channel.id == db.get(`channelcreatelog_${channel.guild.id}`)) return db.delete(`channelcreatelog_${channel.guild.id}`);
        if(channel.id == db.get(`rolecreatelog_${channel.guild.id}`)) return db.delete(`rolecreatelog_${channel.guild.id}`);
        if(channel.id == db.get(`emojicreatelog_${channel.guild.id}`)) return db.delete(`emojicreatelog_${channel.guild.id}`);
        if(channel.id == db.get(`channeldeletelog_${channel.guild.id}`)) return db.delete(`channeldeletelog_${channel.guild.id}`);
        if(channel.id == db.get(`roledeletelog_${channel.guild.id}`)) return db.delete(`roledeletelog_${channel.guild.id}`);
        if(channel.id == db.get(`emojideletelog_${channel.guild.id}`)) return db.delete(`emojideletelog_${channel.guild.id}`);
        if(channel.id == db.get(`channelupdatelog_${channel.guild.id}`)) return db.delete(`channelupdatelog_${channel.guild.id}`);
        if(channel.id == db.get(`roleupdatelog_${channel.guild.id}`)) return db.delete(`roleupdatelog_${channel.guild.id}`);
        if(channel.id == db.get(`msgupdatelog_${channel.guild.id}`)) return db.delete(`msgupdatelog_${channel.guild.id}`);
        if(channel.id == db.get(`msgdeletelog_${channel.guild.id}`)) return db.delete(`msgdeletelog_${channel.guild.id}`);
        if(channel.id == db.get(`joinlog_${channel.guild.id}`)) return db.delete(`joinlog_${channel.guild.id}`);
        if(channel.id == db.get(`leavelog_${channel.guild.id}`)) return db.delete(`leavelog_${channel.guild.id}`);
        if(channel.id == db.get(`banlog_${channel.guild.id}`)) return db.delete(`banlog_${channel.guild.id}`);
        if(channel.id == db.get(`unbanlog_${channel.guild.id}`)) return db.delete(`unbanlog_${channel.guild.id}`);
        if(channel.id == db.get(`kicklog_${channel.guild.id}`)) return db.delete(`kicklog_${channel.guild.id}`);
        if(channel.id == db.get(`greet_${channel.guild.id}_${channel.id}`)) return db.delete(`greet_${channel.guild.id}_${channel.id}`);
        if(channel.id == db.get(`welcome_${channel.guild.id}_${channel.id}`)) return db.delete(`welcome_${channel.guild.id}_${channel.id}`);
        }    

    }
    



export default event;