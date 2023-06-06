import { Client } from "discord.js";
import { REST, Routes } from 'discord.js';
import fs, { readdirSync } from "fs";
import { SlashCommand } from "../types";
import { join } from "path";
/*
module.exports = async (client: Client) => {
    const slashCommandsDir = join(__dirname, "../SlashCommands");
    const body = [];

    readdirSync(slashCommandsDir).forEach(file => {
        if (!file.endsWith(".js")) return;

        const command: SlashCommand = require(`${slashCommandsDir}/${file}`).command;

        client.slashCommands.set(command.name, command);
        body.push(command.data.toJSON());
    });


    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    try {
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: body });
        console.log('(/) slash commandes loads');
    }
    catch (error) {
        console.error(error);
    }
}*/


module.exports = async (client:Client) => {
    const body = []
    fs.readdirSync('./dist/SlashCommands').forEach((dir) => {
        fs.readdirSync(`./dist/SlashCommands/${dir}`).filter((files) => files.endsWith('.js')).forEach((fileName) => {
        const command: SlashCommand = require(`../SlashCommands/${dir}/${fileName}`).command;
           

        client.slashCommands.set(command.name, command);

    
        body.push(command.data.toJSON());

      }); 
      }
      )
      const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

      try {
          await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: body });
          console.log('(/) slash commandes loads');
      }
      catch (error) {
          console.error(error);
      }
    };
      
   