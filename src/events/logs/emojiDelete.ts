import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent, TextChannel, EmbedBuilder} from "discord.js";
import db  from "quick.db"


const event: BotEvent = {
    name: Events.GuildEmojiDelete, 
    once: false,
    async execute(emoji) {

    const logs = await emoji.guild.fetchAuditLogs({limit: 1 ,type: AuditLogEvent.EmojiDelete});
    if (!logs) return;

    const log = logs.entries.first();
    if (!log) return;

    if (log.executor.id === client.user.id) return;

const emojideletelog = db.get(`emojideletelog_${emoji.guild.id}`);
const emojislog = db.get(`emojislog_${emoji.guild.id}`);

if (emojideletelog) {
if (emojideletelog === emojislog) return;
(client.channels.cache.get(emojideletelog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Emoji delete (Logs) - ${emoji.guild.name}` })
            .setDescription(`L'utilisateur <@${log.executor.id}> a supprimé un emoji sur le serveur`)
            .addFields(
                { name: "Emoji", value: `${emoji}/${emoji.name}`, inline: false },
                { name: "ID", value: `${emoji.id}/${emoji.name}`, inline: false },
            )
            .setImage(emoji.url)
            .setColor('#2f3136')
            .setFooter({text:"EmojiDelete logs"})
    ]
})
  }
if (emojislog) {
    (client.channels.cache.get(emojislog) as TextChannel).send({
        embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `Emojis (Logs) - ${emoji.guild.name}` })
                .setDescription(`L'utilisateur <@${log.executor.id}> a supprimé un emoji sur le serveur.`)
                .addFields(
                    { name: "Emoji", value: `${emoji}/${emoji.name}`, inline: false },
                    { name: "ID", value: `${emoji.id}/${emoji.name}`, inline: false },
                )
                .setImage(emoji.url)
                .setColor('#2f3136')
                .setFooter({text:"Emojis logs"})
        ]
    })
  }
}
}

export default event;