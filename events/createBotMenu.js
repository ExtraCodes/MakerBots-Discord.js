const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
} = require("discord.js");

module.exports = {
  name: "interactionCreate",
  run: async (client, interaction) => {
    if (interaction.isStringSelectMenu) {
      if (interaction.customId.startsWith("select-project")) {
        var selection = interaction.values[0];
        var projects = client.projects;
        var forum = projects.find(
          (e) => e.dir === selection.split("-")[1]
        ).forum;

        await interaction.showModal(
          new ModalBuilder()
            .setCustomId(`create-bot-modal-${selection.split("-")[1]}`)
            .setTitle("Create Bot!")
            .addComponents(
              forum.map((e) => {
                return new ActionRowBuilder().addComponents(
                  new TextInputBuilder()
                    .setPlaceholder(e.placeholder)
                    .setCustomId(e.env)
                    .setLabel(e.question)
                    .setRequired(true)
                    .setStyle(e.style)
                );
              })
            )
        );
      }
    }
  },
};
