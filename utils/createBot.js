const { Client, GatewayIntentBits } = require("discord.js");
const pm2 = require("pm2");
const Bot = require("../models/schema/bot");
const { default: axios } = require("axios");
 
module.exports = async function createBot(options) {
  let { client, interaction, env, path } = options;

  let info = client.projects.find((e) => e.dir === path);
  let bot = await axios
    .get("https://discord.com/api/v10/users/@me", {
      headers: {
        Authorization: `Bot ${env.TOKEN}`,
      },
    })
    .catch(console.log); // .catch(() => {});
  if (!bot || !bot?.data?.id) {
    return await interaction.editReply({
      content: "Token Was Invalid",
      ephemeral: true,
    });
  }
  bot = bot.data;
  let check = await Bot.findOne({ botID: bot.id });
  if (check)
    return interaction.editReply({
      content: "This Bot Was Already On Owr DataBase",
      ephemeral: true,
    });
  if (bot.id) {
    pm2.start(
      {
        name: `${bot.id}`,
        script: `./projects/${path}`,
        env: env,
      },
      (err) => {
        if (err) {
          throw err;
        }
      }
    );

    let NewBot = new Bot({
      // projectId:makeid ,
      userId: interaction.user.id,
      botID: bot.id,
      env: env,
      dir: `./projects/${path}`,
      token: env.TOKEN,
      online: true,
    });
    await NewBot.save();
    await client.channels.cache
      .get(client.config.logChannel)
      .send(
        `**__<@${interaction.user.id}> | Was Created New Bot__**\n> **Name:** ${bot.user.username}\n> **Type:** ${info.name}`
      );
    await interaction.editReply({
      content:
        `Your bot: ` + bot.username + ` was run succesfuly in: ` + info.name,
        components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setURL(
              `https://discord.com/api/oauth2/authorize?client_id=${bot.id}&permissions=70368744177655&scope=bot%20applications.commands`
            )
            .setLabel("Invite Your Bot")
        ),
      ],
      ephemeral: true,
    });
  } else {
    await interaction.editReply({
      content: "Token Was Invaild",
      ephemeral: true,
    });
  }
};

function makeid() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let counter = 0;
  while (counter < 13) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }
  return result;
}
