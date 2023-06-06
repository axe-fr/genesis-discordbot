import { BotEvent  } from "../../types";
import { Events, Client, EmbedBuilder, GuildMember} from "discord.js";
import db  from "quick.db"

const event: BotEvent = {
    name: Events.GuildMemberAdd, 
    once: false,
    async execute(member) {
    const bdd = db.get(`welcome_${member.guild.id}`)
    const channel = member.guild.channels.cache.get(bdd);
    if (!channel) {
        db.set(`welcome_${member.guild.id}`, false)
      } else if (!channel == false){

        channel.send({
        embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `${member.user.tag}` })
            .setDescription(`Bienvenue a toi ${member} !`)
            .setColor('#2f3136')
        ]
    });
      } 

}
        

        }

    



export default event;

