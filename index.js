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

app.use("/user", userRoute);

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
  socket.on("hello", (e1) => {
    console.log(e1);
    console.log(socket.id);
  });
});

http.listen(5000, () => {
  console.log("listening on 5000");
});
