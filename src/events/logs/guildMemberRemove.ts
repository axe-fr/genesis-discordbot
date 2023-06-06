import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent ,GuildBan, TextChannel, EmbedBuilder, GuildMember} from "discord.js";
import db  from "quick.db"


const event: BotEvent = {
    name: Events.GuildMemberRemove, 
    once: false,
    async execute(member) {

const leavelog = db.get(`leavelog_${member.guild.id}`);
const joinleavelog = db.get(`joinleavelog_${member.guild.id}`);



if (leavelog) {
if (leavelog === joinleavelog) return;
(client.channels.cache.get(leavelog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Membre quitté (Logs) - ${member.guild.name}` })
            .setDescription(`L'utilisateur ${member} (${member.user.tag}) vient de quitter le serveur.`)
            .addFields(
            { name:"Nombre de membre", value:`${member.guild.memberCount}` },
            
            )

            .setColor('#2f3136')
            .setFooter({text:"Leave logs"})
    ]
})
}
if (joinleavelog) {

        (client.channels.cache.get(joinleavelog) as TextChannel).send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `Membre quitté (Logs) - ${member.guild.name}` })
                    .setDescription(`L'utilisateur ${member} (${member.user.tag}) vient de quitter le serveur.`)
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