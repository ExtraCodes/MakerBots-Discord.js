  require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ],
});

module.exports = client;

client.slashCommands = new Collection();
client.messageCommands = new Collection();
client.config = require("./config");
client.projects = require("./projects/config");
client.createBot = require("./utils/createBot");
["messageCommands", "slashCommands", "mongoose", "errors", "events"].forEach(
  (Handler) => {
    try {
      require(`./handler/${Handler}`)(client);
      console.log(`[HANDLER] Loaded ${Handler} System`);
    } catch (e) {
      console.log(`Error Found In Handler Called ${Handler}\n${e}`);
    }
  }
);

client.rest.on("rateLimited", (info) => {
  console.log("[ Rate Limited Log ]" + info);
});

client.login(process.env.TOKEN);
