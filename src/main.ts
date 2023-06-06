import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import * as dotenv from 'dotenv';
import { SlashCommand } from './types';
import { join } from 'path';
import { readdirSync } from 'fs';
dotenv.config();


export const client = new Client({
    intents: ['Guilds','GuildMembers', 'GuildMessages', 'MessageContent','GuildBans','GuildEmojisAndStickers', 'GuildWebhooks','GuildVoiceStates','Guilds','GuildModeration', 'AutoModerationConfiguration','AutoModerationExecution'],
    partials:[Partials.Channel, Partials.GuildMember, Partials.Message, Partials.User]
  });



client.slashCommands = new Collection<string, SlashCommand>();

const loadDir = join(__dirname, "./load");

readdirSync(loadDir).forEach(handler => {
  require(`${loadDir}/${handler}`)(client);
});


process.on("unhandledRejection", err => {console.log(err);})

client.login(process.env.TOKEN);