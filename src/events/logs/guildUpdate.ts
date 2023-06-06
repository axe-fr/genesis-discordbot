import { BotEvent  } from "../../types";
import { client } from '../../main';
import { Events,Guild, AuditLogEvent, TextChannel, EmbedBuilder} from "discord.js";
import db  from "quick.db"


const event: BotEvent = {
    name: Events.GuildUpdate, 
    once: false,
    async execute(oldGuild: Guild, newGuild: Guild) {


        if (oldGuild === newGuild) return;

        const guild = oldGuild; 
        if (!guild) return;

        const logs = await guild.fetchAuditLogs({limit: 1, type: AuditLogEvent.GuildUpdate });
        if (!logs) return;

        const log = logs.entries.first();
        if (!log) return;

        if (log.executor.id === client.user.id) return;
        

        const guildlog = db.get(`guildlog_${oldGuild.id}`);
        
        if (guildlog) {
        if (oldGuild.vanityURLCode != newGuild.vanityURLCode) {
        (client.channels.cache.get(guildlog) as TextChannel).send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `Serveur Update (Logs) - ${oldGuild.name}` })
                    .setDescription(`L'utilisateur <@${log.executor.id}> a modifié le serveur`)
                    .addFields(
                        { name: "Modification", value: `Url Personnalisé`, inline: false },
                        { name: "Ancien url:", value: `${oldGuild.vanityURLCode}`, inline: false },
                        { name: "Nouveau url:", value: `${newGuild.vanityURLCode}`, inline: false },

                    )
                    .setColor('#2f3136')
                    .setFooter({text:"Guild logs"})
            ]
        }) 
            }
            if (oldGuild.name != newGuild.name) {
        (client.channels.cache.get(guildlog) as TextChannel).send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `Serveur Update (Logs) - ${oldGuild.name}` })
                    .setDescription(`L'utilisateur <@${log.executor.id}> a modifié le serveur`)
                    .addFields(
                        { name: "Modification", value: `Nom`, inline: false },
                        { name: "Ancien nom:", value: `${oldGuild.name}`, inline: false },
                        { name: "Nouveau nom:", value: `${newGuild.name}`, inline: false },

                    )
                    .setColor('#2f3136')
                    .setFooter({text:"Guild logs"})
            ]
        }) 
            }
            if (oldGuild.icon != newGuild.icon) {
                (client.channels.cache.get(guildlog) as TextChannel).send({
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({ name: `Serveur Update (Logs) - ${oldGuild.name}` })
                            .setDescription(`L'utilisateur <@${log.executor.id}> a modifié le serveur`)
                            .addFields(
                                { name: "Modification", value: `Icone`, inline: false },
                                { name: "Ancienne Icone", value: `(Image)`, inline: false },
                            )
                            .setImage(oldGuild.iconURL())
                            .setColor('#2f3136')
                            .setFooter({text:"Guild logs"})
                    ]
                }) 
                    }
            if (oldGuild.banner != newGuild.banner) {
                (client.channels.cache.get(guildlog) as TextChannel).send({
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({ name: `Serveur Update (Logs) - ${oldGuild.name}` })
                            .setDescription(`L'utilisateur <@${log.executor.id}> a modifié le serveur`)
                            .addFields(
                                { name: "Modification", value: `Bannière`, inline: false },
                                { name: "Ancienne bannière", value: `(Image)`, inline: false },
                            )
                            .setImage(oldGuild.bannerURL())
                            .setColor('#2f3136')
                            .setFooter({text:"Guild logs"})
                    ]
                }) 
                    }

                    if (oldGuild.ownerId != newGuild.ownerId) {
                        (client.channels.cache.get(guildlog) as TextChannel).send({
                            embeds: [
                                new EmbedBuilder()
                                    .setAuthor({ name: `Serveur Update (Logs) - ${oldGuild.name}` })
                                    .setDescription(`L'utilisateur <@${log.executor.id}> a donné la couronne à ${newGuild.ownerId}`)
                                    .addFields(
                                        { name: "Modification", value: `Owner`, inline: false },
                                    )
                                    .setColor('#2f3136')
                                    .setFooter({text:"Guild logs"})
                            ]
                        }) 
                            }
            
            
                    
          }
        }



    }

    
        
export default event;