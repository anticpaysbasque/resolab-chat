require("dotenv").config(); // To get environment variables from a .env file
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const server = require("http").Server(app);
const socketIO = require("socket.io");

// Get the Sequelize config
const sequelize = require("./sequelize");
require("./sequelize/associations"); // If you have associations

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("Hello world !"));
app.use("/chatMessages", require("./routes/chatmessage.routes"));

// Get the websocket manager
const io = socketIO(server);
// Websocket
let clients = [];

io.sockets.on("connection", socket => {
  clients.push(socket);
  console.log("Connected : sockets connected : ", clients.length);

  // Disconnect
  socket.on("disconnect", socket => {
    clients.splice(clients.indexOf(socket), 1);
    console.log("Disconnected : sockets conected : ", clients.length);
  });

  io.clients((error, clients) => {
    if (error) throw error;
    console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
  });
  socket.emit("message", { message: "connected to chat", user: "server" });
  socket.on("message", data => {
    console.log(data);
    socket.broadcast.emit("message", data);
    socket.on("disconnect", () => {
      console.log(`Socket ${socket.id} disconnected.`);
    });
  });
  socket.on("subscribe", function(room) {
    console.log("joining room", room);
    socket.join(room);
  });
  socket.on("unsubscribe", function(room) {
    console.log("leaving room", room);
    socket.leave(room);
  });
  socket.on("send", function(data) {
    console.log("sending room post", data.room);
    socket.broadcast.to(data.room).emit("message", {
      message: data.message,
      user: data.user
    });
  });
});

// ********* List all the clients conected

// ********* private chat

// check if test environment
if (process.env.NODE_ENV === "test") {
  app.use("/token", require("./routes/tokenForTests.routes"));
}

async function main() {
  try {
    await sequelize.sync(); // Sync Method will create Database using the config & models
    console.log("Database connection sucessfull");
    server.listen(PORT, err => {
      if (err) throw new Error("Something bad happened...");
      console.log(`Listening to port ${PORT}.`);
    });
  } catch (err) {
    console.error("Unable to reach database", err);
  }
}

if (process.env.NODE_ENV !== "test") {
  main();
}

// If you want to add tests with Mocha & Chai
module.exports = app;
