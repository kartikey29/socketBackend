const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
app.use(express.json());
app.use(cors());
const http = require("http").Server(app);
const io = new require("socket.io")(http, { cors: { origin: "*" } });

require("dotenv").config({ path: "./config.env" });
const connection = require("./scr/db/connection");

connection();

const userRoute = require("./scr/routes/user.route");
const chatRoute = require("./scr/routes/chat.route");

app.use("/user", userRoute);
app.use("/chat", chatRoute);
let onlineUsers = [];

io.use((socket, next) => {
  const id = socket.handshake.auth.id;
  if (!id) {
    return next(new Error("invalid username"));
  }
  socket.id = id;
  next();
});

io.on("connection", (socket) => {
  console.log("connection");

  //recieve message from sender
  socket.on("hello", (e1) => {
    io.to(e1.recieverId).emit("messageRecieved", {
      senderId: socket.id,
      _id: Math.random().toString(),
      recieverId: e1.recieverId,
      senderName: e1.senderName,
      message: e1.message,
      createdAt: new Date(new Date().toUTCString()),
    });
    io.to(socket.id).emit("messageRecieved", {
      senderId: socket.id,
      recieverId: e1.recieverId,
      _id: Math.random().toString(),
      senderName: e1.senderName,
      message: e1.message,
      createdAt: new Date(new Date().toUTCString()),
    });
    io.to(e1.recieverId).emit("notify", {
      senderId: socket.id,
      _id: Math.random().toString(),
      recieverId: e1.recieverId,
      senderName: e1.senderName,
      message: e1.message,
      createdAt: new Date(new Date().toUTCString()),
    });
  });
  socket.on("typing", (e) => {
    io.to(e.recieverId).emit("typing", e);
  });
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => {
      return socket.id != user;
    });
    console.log("disconnet");
    io.emit("get-all-user", onlineUsers, () => {
      console.log(onlineUsers);
    });
  });
  if (!onlineUsers.some((user) => user === socket.id)) {
    onlineUsers.push(socket.id);
    console.log("new user is here!", onlineUsers);
  }
  io.emit("get-all-user", onlineUsers, () => {
    console.log("emit all users con");
  });
});

http.listen(5000, () => {
  console.log("listening on 5000");
});
