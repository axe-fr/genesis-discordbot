import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events, TextChannel, EmbedBuilder } from "discord.js";
import db  from "quick.db"


const event: BotEvent = {
    name: Events.MessageCreate, 
    once: false,
    async execute(message) {
        const links = [
            "discord.gg",
            "dsc.bio",
            "www",
            "https",
            "http",
            ".ga",
            ".fr",
            ".com",
            ".tk",
            ".ml",
            "://",
            ".gg",
            "discord.me",
            "discord.io",
            "invite.me",
            "discordapp.com/invite",
          ];
          let isLinks = false;

          if(links.includes(message.content)) return isLinks = true

          if(!message.guild) return;  
          if(message.member.user.bot) return;

        const raidlog = db.get(`raidlog_${message.guild.id}`);

        if (message.author.id === client.user.id) return;
        if (message.author.id === message.guild.ownerId) return;
        if (db.get(`owners_${message.guild.id}_${message.author.id}`)) return;



        if (db.get(`antilink_${message.guild.id}`) === true) {
        const whitelist = db.get(`whitelist_${message.guild.id}_$}`) 
        if (!whitelist) {
            if(isLinks = true) {
            
            message.delete();
            message.channel
              .send({
                content: `<@${message.author.id}> Tu n'es pas autorisé à envoyer des liens sur ce serveur.`,
              })
              .then((msg) => {
                setTimeout(() => msg.delete(), 6000);
              });
            


            (client.channels.cache.get(raidlog) as TextChannel).send({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: `AntiLink - ${message.guild.name}` })
                        .setDescription(`L'utilisateur <@${message.author.id}> a envoyé un lien dans le salon <#${message.channel.id}`)
                        .addFields(
                            { name: "Lien:", value: `||${message.content}||`, inline: false },
                        )
                        .setColor('#2f3136')
                        .setFooter({text:"/automod AntiLink 'off' pour désactiver"})
                ]
            })
        }
            }  
        
          }
      

    }

    }



export default event;

