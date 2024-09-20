const { InteractionType, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  run: async (client, interaction) => {
    if (interaction.type === InteractionType.ApplicationCommand) {
      const SlashCommands = client.slashCommands.get(interaction.commandName);

      if (SlashCommands) {
        try {
          if (
            SlashCommands.owner &&
            !client.config.OwnerId.includes(interaction.user.id)
          ) {
            interaction.reply({
              content: `Im, Not A Fool Bot, Only Owner Can Use This Commands`,
            });
          }
          await SlashCommands.run(client, interaction);
        } catch (e) {
          console.log(e);
          if (interaction.replied) {
            const embed = new EmbedBuilder().setDescription(
              "There Was An Error Executing The Command, Sorry For The Inconvenience"
            );
            return interaction
              .editReply({ embeds: [embed], ephemeral: true })
              .catch(() => {});
          } else {
            const embed = new EmbedBuilder().setDescription(
              "There Was An Error Executing The Command, Sorry For The Inconvenience"
            );
            return interaction
              .followUp({ embeds: [embed], ephemeral: true })
              .catch(() => {});
          }
        }
      } else return;
    } else return;
  },
};
