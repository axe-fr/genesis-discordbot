import { BotEvent } from "../../types";
import {Events, WebhookClient, EmbedBuilder } from "discord.js";
import { client } from "../../main"
const event: BotEvent = {
    name: Events.GuildDelete,
    once: true,
    async execute(guild) {

    
   const webhook = new WebhookClient({id:"1112068712791552061", token:"vGP2IT-ORnbkBOP5metNIjIT_TBrwwVljaBh9pDOSwediSDUF5qL5VWvOsGcptMcGax5"});

    const embed = new EmbedBuilder()
            .setTitle("Serveur quitté")
            .addFields(
                { name: `Nom du serveur:`, value: `\`${guild.name}\``, inline: true },
                { name: `Utilisateurs:`, value: `\`${guild.memberCount} membres\``, inline: true },
                { name: `Propriètaire:`, value: `<@${guild.ownerId}>`, inline: true },
            )
            .setColor("DarkAqua")

    webhook.send({content:`\`${client.user.username}\` viens de quitter un serveur..`, embeds:[embed]})


    },
}

export default event;