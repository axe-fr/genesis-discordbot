import { BotEvent } from "../../types";
import { Client, Events, WebhookClient } from "discord.js";

const event: BotEvent = {
    name: Events.ClientReady,
    once: true,
    async execute(client: Client) {
    const webhook = new WebhookClient({url:"https://discord.com/api/webhooks/1115629057149763674/MNLs0hqQJbQjgWQGYhE-TR5dDP5tNNljV2qQnlQvAQ2VPkzLQ7bS0RZ3T9QmSn7OLkif"});

    webhook.send({content:`\`${client.user.username}\` est connecté.`})


    console.log((`Connecté ${client.user?.tag}`))
    },
}

export default event;