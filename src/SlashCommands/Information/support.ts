import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} from "discord.js"
import { SlashCommand } from "../../types";
import { client } from "../../main"

export const command: SlashCommand = {
    name:"links",
    data: new SlashCommandBuilder()
        .setName('links')
        .setDescription("Support/Invitation"),
    async execute(interaction) {


        const invite = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Invitation')
                .setStyle(ButtonStyle.Link)
                .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
        );
        const github = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Github')
                .setStyle(ButtonStyle.Link)
                .setURL(`https://github.com/axe-fr/genesis-discordbot`)
        );
        const support = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Support')
                .setStyle(ButtonStyle.Link)
                .setURL(`https://discord.gg/genesisbot`)
        );
        await interaction.reply({content:`<@${interaction.user.id}>`, embeds:[
            new EmbedBuilder()
                .setAuthor({ name: `${interaction.client.user.tag}`})
                .setColor('#2f3136')
                .setFooter({text:"Genesis - v0.5"})
        ], components:[github, support, invite ]
    })


    }
}

export default command;