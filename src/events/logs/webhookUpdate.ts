import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, AuditLogEvent, TextChannel, EmbedBuilder} from "discord.js";
import db  from "quick.db"


const event: BotEvent = {
    name: Events.WebhooksUpdate, 
    once: false,
    async execute(channel:TextChannel) {

        const logs = await channel.guild.fetchAuditLogs({limit: 1, type: AuditLogEvent.WebhookCreate });
        if (!logs) return;

        const log = logs.entries.first();
        if (!log) return;

        if (log.executor.id === channel.client.user.id) return;
        

        const weblog = db.get(`weblog_${channel.guild.id}`);
        
        if (weblog) {
        (client.channels.cache.get(weblog) as TextChannel).send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `Webhook Update (Logs) - ${channel.guild.name}` })
                    .setDescription(`L'utilisateur <@${log.executor.id}> a modifié une interagration (webhook.)`)
                    .addFields(
                        { name: "Webhook", value: `${channel}`, inline: false },
                    )
                    .setColor('#2f3136')
                    .setFooter({text:"Webhook logs"})
            ]
        })
          }
        }



    }

    
        
export default event;