import { SlashCommandBuilder, EmbedBuilder, CommandInteraction } from "discord.js"
import { SlashCommand } from "../../types";
import  db from "quick.db"

export const command: SlashCommand = {
    name: 'setlogs',
    data: new SlashCommandBuilder()
        .setName("setlogs")
        .setDescription("Configure les logs")
        .addStringOption((option) => {
            return option
                .setName('type')
                .setDescription("Module de logs")
                .setRequired(true)
                .addChoices(
                { name: 'Strike/AntiRaid', value: 'raidlog' },
                { name: 'Arrivé & Départ', value: 'joinleavelog' },
                { name: 'Actes de Modération', value: 'modlog' },
                { name: 'Salons', value: 'channellog' },
                { name: 'Messages', value: 'msglog' },
                { name: 'Rôles', value: 'rolelog' },
                { name: 'Webhook', value: 'weblog' },
                { name: 'Vocaux', value: 'voicelog' },
                { name: 'GuildUpdate', value: 'guildlog' },
                { name: 'Emojis', value: 'emojislog' },
                { name: 'ChannelCreate', value: 'channelcreatelog' },
                { name: 'RôleCreate', value: 'rolecreatelog' },
                { name: 'EmojiCreate', value: 'emojicreatelog' },
                { name: 'ChannelUpdate', value: 'channelupdatelog' },
                { name: 'RôleUpdate', value: 'roleupdatelog' },
                { name: 'MessageUpdate', value: 'msgupdatelog' },
                { name: 'ChannelDelete', value: 'channeldeletelog' },
                { name: 'MessageDelete', value: 'msgdeletelog' },
                { name: 'RoleDelete', value: 'roledeletelog' },
                { name: 'EmojiDelete', value: 'emojideletelog' },
                { name: 'Arrivé', value: 'joinlog' },
                { name: 'Départ', value: 'leavelog' },
                { name: 'Ban', value: 'banlog' },
                { name: 'Unban', value: 'unbanlog' },
                { name: 'Kick', value: 'kicklog' },


        )})
        .addChannelOption((option) => {
            return option
                .setName('salon')
                .setDescription("Salon des logs")
                .setRequired(true)
}),
    async execute(interaction) {
        if (!interaction.memberPermissions.has("Administrator")) {
            interaction.reply({ content:"Tu n'as pas la permission d'Administrateur" , ephemeral:true }); 
            } else if(interaction.memberPermissions.has("Administrator")) {
        const type = interaction.options.get('type').value.toString();
        const salon = interaction.options.get('salon').value.toString();

        await db.set(`${type}_${interaction.guild.id}`, salon);
        await interaction.reply({content:`Les logs **${type}** ont été configurée sur <#${salon}>.`, ephemeral:false, fetchReply:true})
       
        }

}
}