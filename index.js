const express = require("express");
const socket = require("socket.io");
const cors = require("cors");

const app = express();
const PORT = 8000;

const server = app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});

app.use(cors());
const io = socket(server, {
  cors: {
    origins: ["*"],
  },
});

io.on("connection", (socketEvent) => {
  console.log("socket=", socketEvent.id);
  socketEvent.on("CLIENT_MSG", (data) => {
    console.log("msg=", data);
    io.emit("SERVER_MSG", data);
  });
});
