const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const port = 4001;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const users = {};

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  socket.on("addUser", (username) => {
    const user = {
      name: username,
      id: socket.id
    };
    users[socket.id] = user;
    io.emit("connected", user);
    io.emit("users", Object.values(users));
  });

  socket.on("addMessage", (data) => {
    io.emit("message", {
      id: data.id,
      text: data.message,
      date: new Date().toISOString(),
      user: users[socket.id]
    });
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("disconnected", socket.id);
  });
});
server.listen(port, () => console.log(`Listening on port ${port}`));
