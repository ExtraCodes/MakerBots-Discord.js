const { readdirSync } = require("fs");

module.exports = (client) => {
  readdirSync("./events/").forEach((file) => {
    const event = require(`../Events/${file}`);
    console.log(`[EVENTS] event named ${file} loaded`);
    client.on(event.name, (...args) => event.run(client, ...args));
  });
};
