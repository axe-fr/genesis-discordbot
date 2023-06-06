import { SlashCommandBuilder } from "discord.js"
import { SlashCommand } from "../../types";
import db  from "quick.db"


export const command: SlashCommand = {
    name: 'welcome-off',
    data: new SlashCommandBuilder()
        .setName('welcome-off')
        .setDescription("Désactive le module."),
    async execute(interaction) {
        if (!interaction.memberPermissions.has("Administrator")) {
            interaction.reply({ content:"Tu n'as pas la permission d'Administrateur" , ephemeral:true }); 
            } else if(interaction.memberPermissions.has("Administrator")) {
    
        const datab = db.get(`welcome_${interaction.guild.id}`)
        if(datab === false) {
        await interaction.reply({ content: `Module déja désactivé`, fetchReply: true });
    } else {
        await db.set(`welcome_${interaction.guild.id}`, false)
        await interaction.reply({ content: `Désactivation du module éffectué`, fetchReply: true})
    }
}
}
}

