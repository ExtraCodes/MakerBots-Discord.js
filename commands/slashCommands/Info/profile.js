const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const Bots = require("../../../models/schema/bot");

// profile command don't want register ///// down

module.exports = {
  name: "profile",
  description: "Show someone profile.",
  options: [
    {
      name: "user",
      description: "enter user",
      type: ApplicationCommandOptionType.User,
      required: false,
    },
  ],
  // dm: false,
  run: async (SynthBot, interaction) => {
    await interaction.deferReply();
    interaction.editReply({ content: `Loading..` }).then(async () => {
      // THX :)
      let bots = await Bots.find({ userId: interaction.user.id });
      if (!bots) {
        return interaction.editReply({
          embeds: [
            new EmbedBuilder().setDescription(
              `> You Dont Have Any Projects Yet!`
            ),
          ],
        });
      }
      // let messageBots = "";
      // for (let i = 0; i < bots.length; i++) {
      //   let me = bots[i];
      //   messageBots = + `${me.status ? '🟢' : '🔴'} | ${me.botID}\n`;
      // }
      interaction.editReply({
        content: "",
        embeds: [
          new EmbedBuilder().addFields(
            {
              name: "ALL BOTS:",
              value: `\`\`\`${bots.length}\`\`\``,
            },
            {
              name: "Bots:",
              value: `\`\`\`${bots.map((e) => {
                return `${e.env.dir}: ${
                  bots.filter(a=> a.env.dir === e.env.dir).length
                }`
              }).join("\n") || "No bots"}\`\`\``, // tell me in discord
            }
          ),
        ], // ولله انك جامد , لو ما كنت بذاكر عربي كنت بتلاقيني سويته في حوالي 10 اسطر :)
      });
    });
  },
};
