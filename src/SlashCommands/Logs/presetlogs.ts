import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ChannelType, ButtonStyle , StringSelectMenuBuilder, ComponentType } from "discord.js"
import { SlashCommand } from "../../types";
import db from "quick.db";

export const command: SlashCommand = {
    name: 'presetlogs',
    data: new SlashCommandBuilder()
        .setName("presetlogs")
        .setDescription("Crée tous les salons de logs"),
    async execute(interaction) {
      if(db.get(`owners_${interaction.guild.id}_${interaction.user.id}`) || interaction.guild.ownerId === interaction.user.id ) {


       /*const row = new ActionRowBuilder<StringSelectMenuBuilder>()
        .addComponents(
          new StringSelectMenuBuilder()
              .setCustomId('presetlogs')
              .setPlaceholder('Choix de logs')
              .setMinValues(1)
              .setMaxValues(10)
              .addOptions([
                  {
                    label: 'Salons',
                    value: 'log_salons',
                  },
                  {
                    label: 'Emojis',
                    value: 'log_emojis',
                  },
                  {
                    label: 'Flux',
                    value: 'log_flux',
                  },
                  {
                    label: 'Rôles',
                    value: 'log_roles',
                  },  
              ])
        )
        */

        const row1 = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setStyle(ButtonStyle.Success)
                .setCustomId('yes_preset_normal')
                .setLabel('Créer les salons')

        );
        const row2 = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setStyle(ButtonStyle.Danger)
                .setCustomId('no_preset_normal')
                .setLabel("Annule l'action")

        );
       

        const rep = 
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `Presetlog`})
                    .setColor('#2f3136')
                    .setFooter({text:"/settings [Logs]"})

            ], components: [row1, row2]
           


            
        });

     


        
        const collector = rep.createMessageComponentCollector({ time: 120000, componentType: ComponentType.Button });


        collector.on('collect', async (ctx) => {
        ctx.deferUpdate()
        if (ctx.user.id !== interaction.user.id) {
        ctx.reply({ ephemeral: true, content: "Vous ne pouvez pas interagir avec cet embed." }).catch(() => {});
        } else {
        const value = ctx.customId
        if (value === 'no_preset_normal') {
           rep.delete()
        }
        if (value === 'yes_preset_normal') {
            const guild = interaction.guild;
        rep.edit({content:"Création des salons en cours..."})
        const categoryCreate = await guild.channels.create({
            name: 'Logs Genesis',
            type: ChannelType.GuildCategory,
          })

          const emojislog = await guild.channels.create({
                        name: "📁・emojis-log",
                        parent: categoryCreate.id,
                        permissionOverwrites: [
                          {
                            id: guild.roles.everyone,
                            deny: ['ViewChannel'] 
                          }
                        ]
                   })
            await db.set(`emojislog_${interaction.guild.id}`, emojislog.id)

          const channelslog = await guild.channels.create({
                        name: "📁・channels-log",
                        parent: categoryCreate.id,
                        permissionOverwrites: [
                          {
                            id: guild.roles.everyone,
                            deny: ['ViewChannel'] 
                          }
                        ]
                   })
            await db.set(`channellog_${interaction.guild.id}`, channelslog.id)

          const modlog = await guild.channels.create({
                        name: "📁・modération-log",
                        parent: categoryCreate.id,
                        permissionOverwrites: [
                          {
                            id: guild.roles.everyone,
                            deny: ['ViewChannel'] 
                          }
                        ]
                   })
            await db.set(`modlog_${interaction.guild.id}`, modlog.id)

          const joinleavelog = await guild.channels.create({
                        name: "📁・flux-log",
                        parent: categoryCreate.id,
                        permissionOverwrites: [
                          {
                            id: guild.roles.everyone,
                            deny: ['ViewChannel'] 
                          }
                        ]
                   })
            await db.set(`joinleavelog_${interaction.guild.id}`, joinleavelog.id)


          const raidlog = await guild.channels.create({
                    name: "📁・raid-log",
                    parent: categoryCreate.id,
                    permissionOverwrites: [
                      {
                        id: guild.roles.everyone,
                        deny: ['ViewChannel'] 
                      }
                    ]
                  })
            await db.set(`raidlog_${interaction.guild.id}`, raidlog.id)


          const msglogs = await guild.channels.create({
                    name: "📁・messages-log",
                    parent: categoryCreate.id,
                    permissionOverwrites: [
                      {
                        id: guild.roles.everyone,
                        deny: ['ViewChannel'] 
                      }
                    ]
                  })
            await db.set(`msglog_${interaction.guild.id}`, msglogs.id)

          const rolelog = await guild.channels.create({
                  name: "📁・rôles-log",
                  parent: categoryCreate.id,
                  permissionOverwrites: [
                  {
                    id: guild.roles.everyone,
                    deny: ['ViewChannel'] 
                  }
                ]
              })
            await db.set(`rolelog_${interaction.guild.id}`, rolelog.id)

        const weblog = await guild.channels.create({
                name: "📁・webhook-log",
                parent: categoryCreate.id,
                permissionOverwrites: [
                  {
                    id: guild.roles.everyone,
                    deny: ['ViewChannel'] 
                  }
                ]
           })
           await db.set(`weblog_${interaction.guild.id}`, weblog.id)

        const voicelog = await guild.channels.create({
                name: "📁・vocaux-log",
                parent: categoryCreate.id,
                permissionOverwrites: [
                  {
                    id: guild.roles.everyone,
                    deny: ['ViewChannel'] 
                  }
                ]
              })
              await db.set(`voicelog_${interaction.guild.id}`, voicelog.id)

        const guildlog = await guild.channels.create({
                name: "📁・serveur-log",
                parent: categoryCreate.id,
                permissionOverwrites: [
                  {
                    id: guild.roles.everyone,
                    deny: ['ViewChannel'] 
                  }
                ]
           })

           await db.set(`guildlog_${interaction.guild.id}`, guildlog.id)


 
       
             
         }


           
    }
})


  
       collector.on('end', (collected, reason) => {
        rep.edit({components:[]}).catch(() => {});
       })

      } else {
        await interaction.reply({content:"Tu n'as pas les permissions nécessaire pour éffectuer cette commande. (Owners)", fetchReply:true, ephemeral:true})
    }
    
    }
}
