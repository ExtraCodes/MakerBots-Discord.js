const { Schema, model } = require("mongoose");

module.exports = model(
  "bot",
  new Schema(
    {
      // projectId: String,
      userId: String,
      botID: String,
      env: Object,
      dir: String,
      token: String,
      online: Boolean,
    },
    { timestamps: true }
  )
);
