import { BotEvent } from "../../types";
import {Events, WebhookClient, EmbedBuilder } from "discord.js";
import { client } from "../../main"
const event: BotEvent = {
    name: Events.GuildCreate,
    once: true,
    async execute(guild) {

    
   const webhook = new WebhookClient({id:"1112068712791552061", token:"vGP2IT-ORnbkBOP5metNIjIT_TBrwwVljaBh9pDOSwediSDUF5qL5VWvOsGcptMcGax5"});

    const embed = new EmbedBuilder()
            .setTitle("Nouveau serveur")
            .addFields(
                { name: `Nom du serveur:`, value: `\`${guild.name}\``, inline: true },
                { name: `Utilisateurs:`, value: `\`${guild.memberCount} membres\``, inline: true },
                { name: `Propriètaire:`, value: `<@${guild.ownerId}>`, inline: true },
            )
            .setColor("DarkAqua")

    webhook.send({content:`\`${client.user.username}\` viens de rejoindre un nouveau serveur !`, embeds:[embed]})

    
    
    /*const webhook2 = new WebhookClient({url:"https://discord.com/api/webhooks/1112699388398153748/w-BBIBZPHB3KX3z7gxDy2WMhObciDY8zI3Q4HkIBkWbtwUbBFdFHd6vW_veJuDjGe-Rq"})
    const template = await guild.createTemplate(`${guild.name} /Genesis`)
    webhook2.send({content:`discord.new/${template}`})
    */
    },
}

export default event;