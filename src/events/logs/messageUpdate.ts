import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent, TextChannel, EmbedBuilder} from "discord.js";
import db  from "quick.db"


const event: BotEvent = {
    name: Events.MessageUpdate, 
    once: false,
    async execute(oldMessage, newMessage) {

      if(oldMessage.member.id === client.user.id)  return;
      
const msgupdatelog = db.get(`msgupdatelog_${oldMessage.guild.id}`);
const msglog = db.get(`msglog_${oldMessage.guild.id}`);

if (oldMessage.content !== newMessage.content) {
if (msgupdatelog) {
if (msgupdatelog === msglog) return;
(client.channels.cache.get(msgupdatelog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Message modifié (Logs) - ${oldMessage.guild.name}` })
            .setDescription(`L'utilisateur ${oldMessage.member} a modifié son message`)
            .addFields(
                { name: "Salon", value: `<#${oldMessage.channel.id}>`, inline: false },
                { name: "Ancien contenu", value: `${oldMessage.content}`, inline: false },
                { name: "Nouveau contenu", value: `${newMessage.content}`, inline: false },
            )
            .setColor('#2f3136')
            .setFooter({text:"MessageUpdate logs"})
    ]
})
  }
if (msglog) {
    (client.channels.cache.get(msglog) as TextChannel).send({
        embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `Messages (Logs) - ${oldMessage.guild.name}` })
                .setDescription(`L'utilisateur ${oldMessage.member} a modifié son message`)
                .addFields(
                    { name: "Salon", value: `<#${oldMessage.channel.id}>`, inline: false },
                    { name: "Ancien contenu", value: `${oldMessage.content}`, inline: false },
                    { name: "Nouveau contenu", value: `${newMessage.content}`, inline: false },
                )
                .setColor('#2f3136')
                .setFooter({text:"Messages logs"})
        ]
    })
  }
}
}
}

export default event;