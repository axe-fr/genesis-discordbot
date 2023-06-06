import { SlashCommandBuilder, EmbedBuilder, CommandInteraction } from "discord.js"
import { SlashCommand } from "../../types";
import  db from "quick.db"

export const command: SlashCommand = {
    name: 'automod',
    data: new SlashCommandBuilder()
        .setName("automod")
        .setDescription("Configure la sécurité")
        .addStringOption((option) => {
            return option
                .setName('module')
                .setDescription("Module d'automod")
                .setRequired(true)
                .addChoices(
                { name: 'AntiLink', value: 'antilink' },

        )})
        .addStringOption((option) => {
            return option
                .setName('type')
                .setDescription("Type d'action/configuration")
                .setRequired(true)
                .addChoices(
                { name: 'Statut', value: 'automod_statut' },
                { name: 'Activer', value: 'automod_on' },
                { name: 'Désactiver', value: 'automod_off' },
        )}),
    async execute(interaction) {
    if(db.get(`owners_${interaction.guild.id}_${interaction.user.id}`) || interaction.guild.ownerId === interaction.user.id ) {

    const mod = interaction.options.get('module').value.toString();
    const type = interaction.options.get('type').value.toString();

        if(type === "automod_on") {
            await db.set(`${mod}_${interaction.guild.id}`, true);
            await interaction.reply({content:`L'automod **${mod}** est maintenant activé sur le serveur.`, ephemeral:false, fetchReply:true})
        }
        if(type === "automod_off") {
            await db.set(`${mod}_${interaction.guild.id}`, false);
            await interaction.reply({content:` L'automod' **${mod}** est maintenant désactivé.`, ephemeral:false, fetchReply:true})
        }
        if(type === "automod_statut") {
        const statut = db.get(`${mod}_${interaction.guild.id}`);
            const content = statut ? "activé" : "désactivé"
            await interaction.reply({content:` L'automod **${mod}** est __${content}__.`, ephemeral:false, fetchReply:true})
        }
        if(type === "antiraid_max") {
            await db.set(`${mod}_${interaction.guild.id}`, true);

            await interaction.reply({content:` L'automod **${mod}** est maintenant activé au maximum, les  membres présents dans la whitelist seront affecté par la sanction configuré.`, ephemeral:false, fetchReply:true})
        }



    } else {
        await interaction.reply({content:"Tu n'as pas les permissions nécessaire pour éffectuer cette commande. (Owners)", fetchReply:true, ephemeral:true})
    }
}
}