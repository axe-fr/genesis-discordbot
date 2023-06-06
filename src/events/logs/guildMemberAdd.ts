import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, TextChannel, EmbedBuilder} from "discord.js";
import db  from "quick.db"


const event: BotEvent = {
    name: Events.GuildMemberAdd, 
    once: false,
    async execute(member) {

const joinlog = db.get(`joinlog_${member.guild.id}`);
const joinleavelog = db.get(`joinleavelog_${member.guild.id}`);



if (joinlog) {
if (joinlog ===  joinleavelog) return;
(client.channels.cache.get(joinlog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Nouveau membre (Logs) - ${member.guild.name}` })
            .setDescription(`L'utilisateur ${member} (${member.user.tag}) vient de rejoindre le serveur.`)
            .addFields(
            { name:"Nombre de membre", value:`${member.guild.memberCount}` },
            
            )

            .setColor('#2f3136')
            .setFooter({text:"Join logs"})
    ]
})
}
if (joinleavelog) {

        (client.channels.cache.get(joinleavelog) as TextChannel).send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `Nouveau membre (Logs) - ${member.guild.name}` })
                    .setDescription(`L'utilisateur ${member} (${member.user.tag}) vient de rejoindre le serveur.`)
                    .addFields(
                    { name:"Nombre de membre", value:`${member.guild.memberCount}` },
                    
                    )
        
                    .setColor('#2f3136')
                    .setFooter({text:"JoinLeave logs"})
            ]
        })
}
}
}

export default event;