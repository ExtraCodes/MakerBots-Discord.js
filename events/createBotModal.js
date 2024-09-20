const { InteractionType } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  run: async (client, interaction) => {
    if (interaction.type === InteractionType.ModalSubmit) {
      if (interaction.customId.startsWith("create-bot-modal")) {
        var fields = await interaction.fields.fields;
        var data = {};
        var path = interaction.customId.split("-")[3];

        fields.map((e) => (data[e.customId] = e.value));

        await interaction.deferReply({
          content: "> **The information you provided has been checked.** Please wait!",
          ephemeral: true,
        });

        client.createBot({
          client,
          interaction,
          env: data,
          path,
        });
      }
    }
  },
};
