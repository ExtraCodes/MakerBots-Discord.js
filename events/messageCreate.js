const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "messageCreate",
  run: async (client, message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(process.env.PREFIX) !== 0) return;

    const args = message.content
      .slice(process.env.PREFIX.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.messageCommands.get(command);

    if (cmd) {
      try {
        if (cmd.owner && !client.config.owners.includes(message.author.id)) {
          command.reply({
            content: `Im, Not A Fool Bot, Only Owner Can Use This Commands`,
          });
        }
        await cmd.run(client, message, args);
      } catch (e) {
        console.log(e);
      }
    } else return;
  },
};
