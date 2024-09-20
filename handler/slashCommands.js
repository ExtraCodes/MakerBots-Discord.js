const { readdirSync } = require("fs");
const { Routes, REST } = require("discord.js");

module.exports = async (client) => {
  var slashCommands = [];
  readdirSync("./commands/slashCommands").forEach((dir) => {
    const SlashCommandFile = readdirSync(`./commands/slashCommands/${dir}`);

    for (let file of SlashCommandFile) {
      const slashCommand = require(`../commands/slashCommands/${dir}/${file}`);
      if (!slashCommand.name)
        return console.error(
          `slashCommandNameError: ${
            slashCommand.split(".")[0]
          } application command name is required.`
        );
      if (!slashCommand.description)
        return console.error(
          `slashCommandDescriptionError: ${
            slashCommand.split(".")[0]
          } application command description is required.`
        );
      client.slashCommands.set(slashCommand.name, slashCommand);
      console.log(
        `[SlashCommand] slashCommands Command (/) Added: ${slashCommand.name}`
      );
      slashCommands.push({
        name: slashCommand.name,
        description: slashCommand.description,
        type: slashCommand.type,
        options: slashCommand.options ? slashCommand.options : null,
        dm_permission: slashCommand.dm ? slashCommand.dm : null,
      });
    }

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    client.on("ready", async () => {
      (async () => {
        try {
          console.log(
            `[SlashCommand] Started refreshing application (/) commands.`
          );
          await rest.put(Routes.applicationCommands(client.user.id), {
            body: slashCommands,
          });
          console.log(
            `[SlashCommand] Successfully reloaded application (/) commands.`
          );
        } catch (error) {
          console.error(`[SlashCommand] SlashError: ${error}`);
        }
      })();
    });
  });
};