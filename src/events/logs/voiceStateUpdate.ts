import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, VoiceState, AuditLogEvent, TextChannel, EmbedBuilder} from "discord.js";
import db  from "quick.db"


const event: BotEvent = {
    name: Events.VoiceStateUpdate, 
    once: false,
    async execute(oldState: VoiceState, newState: VoiceState) {


        const voicelog = db.get(`voicelog_${oldState.guild.id}`)


        if(voicelog) {

        
        if (!oldState.channel && newState.channel) {
        (client.channels.cache.get(voicelog) as TextChannel).send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `Vocaux (Logs) - ${oldState.guild.id}` })
                    .setDescription(`L'utilisateur <@${newState.member?.user.id}> a rejoint un salon vocal`)
                    .addFields(
                        { name: "Salon", value: `<#${newState.channel.id}>`, inline: false },

                    )
                    .setColor('#2f3136')
                    .setFooter({text:"Voice logs"})
            ]
        })


        }
        if (oldState.channel && !newState.channel) {
            (client.channels.cache.get(voicelog) as TextChannel).send({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: `Vocaux (Logs) - ${oldState.guild.id}` })
                        .setDescription(`L'utilisateur <@${newState.member?.user.id}> a quitté un salon vocal`)
                        .addFields(
                            { name: "Salon", value: `<#${oldState.channel.id}>`, inline: false },
    
                        )
                        .setColor('#2f3136')
                        .setFooter({text:"Voice logs"})
                ]
            })
          }
  


    }
    }

}
        
export default event;