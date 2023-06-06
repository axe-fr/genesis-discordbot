import { Client } from "discord.js";
import fs from "fs";
import { BotEvent } from "../types";




module.exports = (client: Client) => {
    fs.readdirSync('./dist/events').forEach((dir) => {
        fs.readdirSync(`./dist/events/${dir}`).filter((files) => files.endsWith('.js')).forEach((fileName) => {
        const event: BotEvent  = require(`../events/${dir}/${fileName}`)?.default ?? require(`../events/${dir}/${fileName}`);
    
        event.once 
        ? client.once(event.name, (...args) => event.execute(...args)) 
        : client.on(event.name, (...args) => event.execute(...args));
    
        console.log(`événement chargé ${dir} => ${event.name}`);
    
        });
      });
    }