import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent, TextChannel, EmbedBuilder} from "discord.js";
import db  from "quick.db"


const event: BotEvent = {
    name: Events.GuildEmojiCreate, 
    once: false,
    async execute(emoji) {

    const logs = await emoji.guild.fetchAuditLogs({limit: 1 ,type: AuditLogEvent.EmojiCreate});
    if (!logs) return;

    const log = logs.entries.first();
    if (!log) return;

    if (log.executor.id === client.user.id) return;

const emojicreatelog = db.get(`emojicreatelog_${emoji.guild.id}`);
const emojislog = db.get(`emojislog_${emoji.guild.id}`);

if (emojicreatelog) {
if (emojicreatelog === emojislog) return;
(client.channels.cache.get(emojicreatelog) as TextChannel).send({
    embeds: [
        new EmbedBuilder()
            .setAuthor({ name: `Emoji create (Logs) - ${emoji.guild.name}` })
            .setDescription(`L'utilisateur <@${log.executor.id}> a créé un emoji sur le serveur`)
            .addFields(
                { name: "Emoji", value: `${emoji}/${emoji.name}`, inline: false },
                { name: "ID", value: `${emoji.id}/${emoji.name}`, inline: false },
            )
            .setImage(emoji.url)
            .setColor('#2f3136')
            .setFooter({text:"EmojiCreate logs"})
    ]
})
  }
if (emojislog) {
    (client.channels.cache.get(emojislog) as TextChannel).send({
        embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `Emojis (Logs) - ${emoji.guild.name}` })
                .setDescription(`L'utilisateur <@${log.executor.id}> a créé un emoji sur le serveur.`)
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