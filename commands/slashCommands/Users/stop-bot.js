const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "bot",
  description: "Gets The Response Time",
  options: [
    {
      name: "stop",
      description: "stop bot",
      type: ApplicationCommandOptionType.Subcommand,
    },
  ],
  // dm: false,
  run: async (SynthBot, interaction, prefix) => {
    await interaction.deferReply({ ephemeral: true });
    interaction.editReply({ content: `Pinging` }).then(() => {
      const pinged = new EmbedBuilder()
        .setAuthor({
          name: "Pinged The Response Time",
          iconURL: SynthBot.user.displayAvatarURL(),
        })
        .addFields(
          {
            name: "Bot Latency",
            value: `\`\`\`[ ${Date.now() - interaction.createdAt}ms ]\`\`\``,
          },
          {
            name: "Gateway Latency",
            value: `\`\`\`[ ${SynthBot.ws.ping}ms ]\`\`\``,
          }
        );
      interaction.editReply({ content: `Pinged`, embeds: [pinged] });
    });
  },
};
