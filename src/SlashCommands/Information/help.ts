import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ComponentType, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommand } from "../../types";
import { client } from "../../main";

export const command: SlashCommand = {
    name: 'help',
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Liste des commandes (catégorisées)"),
    async execute(interaction) {

        const row = new ActionRowBuilder<StringSelectMenuBuilder>()
        .addComponents(
            new StringSelectMenuBuilder()

                .setCustomId('help')
                .setPlaceholder('Catégorie de commandes')
                .addOptions([
                    {
                        label: 'Utilitaire',
                        value: 'help_utils',
                    },
                    {
                        label: 'Sécurtité',
                        value: 'help_antiraid',
                    },
                    {
                        label: 'Logs',
                        value: 'help_logs',
                    },
                    {
                        label: 'Paramètres',
                        value: 'help_params',
                    },                    
                    {
                        label: 'Gestion',
                        value: 'help_gestion',
                    },
                    /*{
                        label: 'Modération',
                        value: 'help_mods',
                    },*/
                    
                    
                ])
        );
        const invite = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Invitation')
                .setStyle(ButtonStyle.Link)
                .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
        );


        const rep = 
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `${interaction.client.user.tag}`})
                    .addFields(
                        { name: "Support", value: "[\`Serveur\`](https://discord.gg/genesisbot)", inline: true },
                        { name: "Open-source", value: "[\`Github\`](https://github.com/axe-fr/genesis-discordbot)", inline: true },
                        { name: "Développeur", value: "\`axe#1111\`", inline: true },
                    )
                    .setColor('#2f3136')
                    .setFooter({text:"Genesis - v0.5"})

            ], components: [row, invite]
           


            
        });


        
        const collector = rep.createMessageComponentCollector({ time: 120000, componentType: ComponentType.StringSelect });

        collector.on('collect', (ctx) => {
        ctx.deferUpdate()
        if (ctx.user.id !== interaction.user.id) {
        ctx.reply({ ephemeral: true, content: "Vous ne pouvez pas interagir avec cet embed." }).catch(() => {});
        } else {
        if(ctx.customId === "help") {
        const value = ctx.values[0]
        if(value === "help_utils") {
         interaction.editReply({
            content:"Commandes - Utilitaire",
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: `${interaction.client.user.tag}`})
                        .setTitle("Utilitaire")
                        .setDescription(`Les arguments entre <...> sont obligatoires, alors que les argurments présent entre [...] sont facultatifs.`)
                        .addFields(
                            { name: "**\`/ping\`**", value: "Affiche le ping/latence du bot.", inline: false },
                            { name: "**\`/help\`**", value: "Affiche toutes les commandes du bot.", inline: false },
                        )
                        .setColor('#2f3136')
                        .setFooter({text:"Genesis - v0.5"})
    
                ],components: [row]
               
    
    
                
            });
        }
         if(value === "help_gestion") {
         interaction.editReply({
            content:"Commandes - Gestion",
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: `${interaction.client.user.tag}`})
                        .setTitle("Gestion")
                        .setDescription(`Les arguments entre <...> sont obligatoires, alors que les argurments présent entre [...] sont facultatifs.`)
                        .addFields(
                            { name: "**\`/whitelist [Utilisateur]\`**", value: "Ajoute un utilisateur a la whitelist/Affiche la whitelist", inline: false },
                            { name: "**\`/unwhitelist <Utilisateur>\`**", value: "Retire un utilisateur de la whitelist", inline: false },
                            { name: "**\`/whitelist-clear\`**", value: "Retire tous les utilisateurs whitelist de la whitelist", inline: false },
                            { name: "**\`/owner [Utilisateur]\`**", value: "Ajoute un utilisateur aux owners", inline: false },
                            { name: "**\`/unowner <Utilisateur>\`**", value: "Retire un utilisateur des owners", inline: false },
                            { name: "**\`/owner-clear\`**", value: "Retire tous les utilisateurs owners du serveur", inline: false },
                        )
                        .setColor('#2f3136')
                        .setFooter({text:"Genesis - v0.5"})
    
                ],components: [row]
               
    
    
                
            });
        }
         if(value === "help_antiraid") {
         interaction.editReply({
            content:"Commandes - Sécurité",
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: `${interaction.client.user.tag}`})
                        .setTitle("Sécurité")
                        .setDescription(`Les arguments entre <...> sont obligatoires, alors que les argurments présent entre [...] sont facultatifs.`)
                        .addFields(
                            { name: "**\`/antiraid <Module d'antiraid> <Statut/Activer/Désactiver/Maximum>\`**", value: "Configure l'antiraid du serveur.", inline: false },
                            { name: "**\`/punitions <Module d'antiraid> <Ban/Kick>\`**", value: "Configure un punition a un module d'antiraid", inline: false },
                            { name: "**\`/settings <Sécurité/...>\`**", value: "Affiche les paramètres du bot.", inline: false },
                            )
                        .setColor('#2f3136')
                        .setFooter({text:"Genesis - v0.5"})
    
                ],components: [row]
               
    
    
                
            });
        }
        if(value === "help_logs") {
            interaction.editReply({
                content:"Commandes - Logs",
                   embeds: [
                       new EmbedBuilder()
                           .setAuthor({ name: `${interaction.client.user.tag}`})
                           .setTitle("Logs")
                           .setDescription(`Les arguments entre <...> sont obligatoires, alors que les argurments présent entre [...] sont facultatifs.`)
                           .addFields(
                            { name: "**\`/setlogs <Type d'événements> <#Salon>\`**", value: "Configure les logs du serveur.", inline: false },
                            { name: "**\`/nolog  <#Salon>\`**", value: "Désactive les logs sur un channel.", inline: false },
                            { name: "**\`/presetlogs\`**", value: "Gènere automatiquement et configure tous les salons de logs nécéssaires", inline: false },
                            { name: "**\`/settings <Logs/...>\`**", value: "Affiche les paramètres du bot.", inline: false },
                           )
                           .setColor('#2f3136')
                           .setFooter({text:"Genesis - v0.5"})
       
                   ],components: [row]
                  
       
       
                   
               });
           }
           if(value === "help_params") {
            interaction.editReply({
                content:"Commandes - Paramètres et Configuration",
                   embeds: [
                       new EmbedBuilder()
                           .setAuthor({ name: `${interaction.client.user.tag}`})
                           .setTitle("Paramètres")
                           .setDescription(`Les arguments entre <...> sont obligatoires, alors que les argurments présent entre [...] sont facultatifs.`)
                           .addFields(
                            { name: "**\`/welcome [#Salon]\`**", value: "Configure le salon de bienvenue/Affiche le salon configuré.", inline: false },
                            { name: "**\`/welcome-off\`**", value: "Désactive la salon de bienvenue.", inline: false },
                            { name: "**\`/greet [#Salon]\`**", value: "Ajoute un salon/Affiche les salons configurés.", inline: false },
                            { name: "**\`/ungreet <#Salon>\`**", value: "Retire un salon des salons greet/", inline: false },
                            { name: "**\`/greet-clear\`**", value: "Supprime tous les salons greet de la base de données", inline: false },
                            { name: "**\`/settings <Autres/...>\`**", value: "Affiche les paramètres du bot.", inline: false },
                           )
                           .setColor('#2f3136')
                           .setFooter({text:"Genesis - v0.5"})
       
                   ],components: [row]
                  
       
       
                   
               });
           }
           if(value === "help_mods") {
            interaction.editReply({ 
                content:"Commandes - Modération",
                   embeds: [
                       new EmbedBuilder()
                           .setAuthor({ name: `${interaction.client.user.tag}`})
                           .setTitle("Modération")
                           .setDescription(`Les arguments entre <...> sont obligatoires, alors que les argurments présent entre [...] sont facultatifs.`)
                           .setColor('#2f3136')
                           .setFooter({text:"Genesis - v0.5"})
       
                   ], components: [row]
                  
       
       
                   
               });
           }
       };
    }
})
       collector.on('end', (collected, reason) => {
        rep.edit({components:[]}).catch(() => {});
       })
    
    }
}