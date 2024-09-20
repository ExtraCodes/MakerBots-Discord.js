const Bot = require("../models/schema/bot");
const pm2 = require("pm2");

module.exports = {
  name: "ready",
  run: async (client) => {
    console.log(
      `[CLIENT] ${client.user.tag} is logged in and ready to listen your commands`
    );
    var bots = await Bot.find({});
    var all_bots = [];
    var online_bots = [];

    for (let i = 0; i < bots.length; i++) {
      all_bots.push(bots[i].env.TOKEN);
    }

    pm2.list((err, list) => {
      for (let i = 0; i < list.length; i++) {
        if (list[i].pm2_env?.status === "online") {
          online_bots.push(list[i].name);
        }
      }
    });

    for (let i = 0; i < all_bots.length; i++) {
      let e = all_bots[i];
      if (!online_bots.includes(e)) {
        let bot = await Bot.findOne({ "env.TOKEN": e });
        pm2.start(
          {
            name: `${bot.botID}`,
            script: bot.dir,
            env: bot.env,
          },
          (err) => {
            if (err) {
              throw err;
            }
          }
        );
      }
    }
  },
};
