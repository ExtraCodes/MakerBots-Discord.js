const { connect, connection } = require("mongoose");

module.exports = async (client) => {
  connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    autoIndex: false,
    connectTimeoutMS: 10000,
    family: 4,
    useUnifiedTopology: true,
  });

  connection.on("connected", () => {
    console.log("[MONGOOSE] " + "DATABASE CONNECTED");
  });

  connection.on("err", (err) => {
    console.log("[MONGOOSE] " + `Mongoose connection error: \n ${err.stack}`);
  });

  connection.on("disconnected", () => {
    console.log("[MONGOOSE] " + "Mongoose disconnected");
  });
};
