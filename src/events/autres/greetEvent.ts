import { BotEvent  } from "../../types";
import { Events, Client, EmbedBuilder, GuildMember} from "discord.js";
import db  from "quick.db"

const event: BotEvent = {
    name: Events.GuildMemberAdd, 
    once: false,
    async execute(member) {
      if (member) {
        let guild = member.guild;
        let ghostsettings = db.get(`greetsettings_${guild.id}`);
    
        if (!ghostsettings) return;
    
        if (ghostsettings === true) {
          guild.channels.fetch().then((channels) => {
            channels.forEach(async (c) => {
              if (!db.get(`greet_${guild.id}_${c.id}`)) return;
    
              c.send(`<@${member.id}>`).then((message) => {
                setTimeout(() => message.delete(), 1000);
              });
            });
          });
        }
      }
}
      
        }
export default event;

