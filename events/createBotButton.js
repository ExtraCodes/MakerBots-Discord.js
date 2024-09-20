const {
  InteractionType,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  name: "interactionCreate",
  run: async (client, interaction) => {
    if (interaction.type === InteractionType.MessageComponent) {
      if (interaction.customId === "create-bot-button") {
        var projects = client.projects;
        interaction.reply({
          components: [
            new ActionRowBuilder()
            .addComponents(
              new StringSelectMenuBuilder()
                .setCustomId("select-project")
                .setPlaceholder("Create Your Bot.")
                .addOptions(
                  projects.map((e) => {
                    if (e.type === "system") {
                    return new StringSelectMenuOptionBuilder()
                      .setLabel(e.name)
                      .setEmoji(e.emoji)
                      .setDescription(`Create Your Own ${e.name} Bot`)
                      .setValue(`create-${e.dir}`);
                    } 
                  })
                )
            ),
            new ActionRowBuilder()
            .addComponents(

              new StringSelectMenuBuilder()

                .setCustomId("select-project-1")
                .setPlaceholder("Create Your Bot.")
                .addOptions(
                  projects.map((e) => {
                    if (e.type === "utiles") {
                    return new StringSelectMenuOptionBuilder()
                      .setLabel(e.name)
                      .setEmoji(e.emoji)
                      .setDescription(`Create Your Own ${e.name} Bot`)
                      .setValue(`create-${e.dir}`);
                    }
                  })
                )
            )
          ],
          ephemeral: true,
        });
      }
    }
  },
};
