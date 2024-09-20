const { TextInputStyle } = require("discord.js");

module.exports = [
  {
    name: "Music",
    emoji: "🎵",
    dir: "music",
    type: "utiles",
    forum: [
      {
        question: "Enter Bot Prefix:",
        placeholder: "like: !",
        style: TextInputStyle.Short,
        env: "PREFIX",
        },

      {
        question: "Enter Your Guild ID:",
        placeholder: "like: 123456789011",
        style: TextInputStyle.Short,
        env: "GUILD",
        },
      {
        question: "Enter Bot Token:",
        placeholder: "like: xxxxxxxxxxxxxx",
        style: TextInputStyle.Paragraph,
        env: "TOKEN",
        },
      ],
  },
  {
    name: "Apply",
    emoji: "📝",
    dir: "apply",
    type: "system",
    forum: [
      {
        question: "Enter Bot Prefix:",
        placeholder: "like: !",
        style: TextInputStyle.Short,
        env: "PREFIX",
      },

      {
        question: "Enter Your Guild ID:",
        placeholder: "like: 123456789011",
        style: TextInputStyle.Short,
        env: "GUILD",
      },
      {
        question: "Enter Bot Token:",
        placeholder: "like: xxxxxxxxxxxxxx",
        style: TextInputStyle.Paragraph,
        env: "TOKEN",
      },
    ],
   },
   {
    name: "Ticket",
    emoji: "🎟️",
    dir: "ticket",
    type: "system",
    forum: [
      {
        question: "Enter Bot Prefix:",
        placeholder: "like: !",
        style: TextInputStyle.Short,
        env: "PREFIX",
      },

      {
        question: "Enter Your Guild ID:",
        placeholder: "like: 123456789011",
        style: TextInputStyle.Short,
        env: "GUILD",
      },
      {
        question: "Enter Bot Token:",
        placeholder: "like: xxxxxxxxxxxxxx",
        style: TextInputStyle.Paragraph,
        env: "TOKEN",
      },
    ],
  },
  {
    name: "Tax",
    emoji: "🧾",
    dir: "tax",
    type: "utiles",
    forum: [
      {
        question: "Enter Bot Prefix:",
        placeholder: "like: !",
        style: TextInputStyle.Short,
        env: "PREFIX",
      },

      {
        question: "Enter Your Guild ID:",
        placeholder: "like: 123456789011",
        style: TextInputStyle.Short,
        env: "GUILD",
      },
      {
        question: "Enter Bot Token:",
        placeholder: "like: xxxxxxxxxxxxxx",
        style: TextInputStyle.Paragraph,
        env: "TOKEN",
      },
    ],
  }
];