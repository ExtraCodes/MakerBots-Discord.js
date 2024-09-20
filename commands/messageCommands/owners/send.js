const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  name: "send",
  description: "Send A Creation Message",
  owner: true,
  run: async (client, message, args) => {
    message.delete();

    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor(client.config.color)
          .setFooter({
            text: "© All rights reserved to Foloura Service's",
            iconURL: client.user.avatarURL(),
          })
          .setTitle("Create your bot for free")
          .setDescription(
            `Create your own bot now from here and enjoy the advantages of advanced bots that are not found anywhere else.`
          )
          .addFields({
            name: "Bot Price's",
            value: "All bots currently available are free and operate in a better and better way."
          })
          .setImage(
            "https://media.discordapp.net/attachments/1100778249769984010/1102944449971114095/create.png"
          ),
      ],
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("create-bot-button")
            .setEmoji("1102943441211621426")
            .setStyle(ButtonStyle.Secondary)
            .setLabel("Create Bot")
        ),
      ],
    });
  },
};