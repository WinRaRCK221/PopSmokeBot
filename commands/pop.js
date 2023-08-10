const { SlashCommandBuilder } = require("discord.js");
const { getClip } = require("../audio");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("pop")
        .setDescription("don't forget the smoke"),

    async execute(interaction) {
        await interaction.deferReply();

        interaction.editReply(getClip());
        interaction.editReply({ files: ["./temp.mp3"] });
    }
}