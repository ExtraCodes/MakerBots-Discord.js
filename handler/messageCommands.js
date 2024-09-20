const { readdirSync } = require("fs");

module.exports = async (client) => {
  var messageCommands = [];
  readdirSync("./commands/messageCommands/").forEach((dir) => {
    const CommandsFile = readdirSync(`./commands/messageCommands/${dir}`);

    for (let file of CommandsFile) {
      const Command = require(`../commands/messageCommands/${dir}/${file}`);
      if (!Command.name)
        return console.error(
          `Command ERROR: ${Command.split(".")[0]} command name is required.`
        );
      if (!Command.description) Command.description = "No Description";
      client.messageCommands.set(Command.name, Command);
      console.log(
        `[MESSAGECOMMANDS] Command (${process.env.PREFIX}) Added: ${Command.name}`
      );
      messageCommands.push({
        name: Command.name,
        description: Command.description,
        dm_permission: Command.dm ? Command.dm : null,
      });
    }
  });
};
