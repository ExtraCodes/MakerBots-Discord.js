const Discord = require("discord.js");
const { Client, GatewayIntentBits } = Discord;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});
const { prefix, Token } = {
  prefix: process.env.PREFIX || '!',
  Token: process.env.TOKEN
}
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true,
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin(),
  ],
});

///////////////////////// MAIN \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

////////// DISTUBE EVENTS \\\\\\\\\\\\\

distube
  .on("playSong", (queue, song) =>
    queue.textChannel.send(
      `**✨ | Playing \`${song.name}\` - \`${song.formattedDuration}\`\n\`\`\`Requested by: ${song.user.username}\`\`\`**`
    )
  )
  .on("addSong", (queue, song) =>
    queue.textChannel.send(
      `**✅ | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}**`
    )
  )
  .on("addList", (queue, playlist) =>
    queue.textChannel.send(
      `**✅ | Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue**`
    )
  )
  .on("error", (channel, e) => {
    if (channel)
      channel.send(
        `**❌ | An error encountered:**\n\`\`\`${e
          .toString()
          .slice(0, 1974)}\`\`\``
      );
    else return;
  })
  .on("empty", (channel) =>
    channel.send("**😴 | Voice channel is empty! Leaving the channel...**")
  )
  .on("searchNoResult", (message, query) =>
    message.channel.send(`**❌ | No result found for \`${query}\`!**`)
  )
  .on("finish", (queue) => queue.textChannel.send("**✅ |Finished!**"));

////////////// COMMANDS \\\\\\\\\\\\\\\

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (!cmd) return;
  if (!message.member.voice.channel) {
    return message.channel.send(`**❌ | You must be in a voice channel!**`);
  }

  if (cmd === "play") {
    const string = args.join(" ");
    if (!string)
      return message.channel.send(
        `**❌ | Please enter a song url or query to search.**`
      );
    distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message,
    });
  } else if (cmd === "stop") {
    const queue = distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `**❌ | There is nothing in the queue right now!**`
      );
    queue.stop();
    message.channel.send(`**✅ | Stopped!**`);
  } else if (cmd === "skip") {
    const queue = distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `**❌ | There is nothing in the queue right now!**`
      );
    try {
      const song = await queue.skip();
      message.channel.send(`**✅ | Skipped! Now playing:\n${song.name}**`);
    } catch (e) {
      message.channel.send(`**❌ | ${e}**`);
    }
  } else if (cmd === "queue") {
    const queue = distube.getQueue(message);
    if (!queue)
      return message.channel.send(`**❌ | There is nothing playing!**`);
    const q = queue.songs
      .map(
        (song, i) =>
          `> ${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${
            song.formattedDuration
          }\``
      )
      .join("\n");
    message.channel.send(`**📀 | Server Queue**\n${q}`);
  } else if (cmd === "volume") {
    const queue = distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `**❌ | There is nothing in the queue right now!**`
      );
    const volume = parseInt(args[0]);
    if (isNaN(volume))
      return message.channel.send(`**❌ | Please enter a valid number!**`);
    // if (volume >= 400)
    //   return message.channel.send(`**❌ | Max vloume number is \`400\`!**`);
    queue.setVolume(volume);
    message.channel.send(`**🔊 | Volume set to \`${volume}\`**`);
  } else if (cmd === "pause") {
    const queue = distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `**❌ | There is nothing in the queue right now!**`
      );
    if (queue.paused) {
      return message.channel.send("**❌ | Music already paused!**");
    }
    queue.pause();
    message.channel.send("Paused the song for you :)");
  } else if (cmd === "resume") {
    const queue = distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `**❌ | There is nothing in the queue right now!**`
      );
    if (queue.paused) {
      queue.resume();
      message.channel.send("**✅ | Done Resumed the song.**");
    } else {
      message.channel.send("**❌ | The queue is not paused!**");
    }
  }
});

client.login(Token);
