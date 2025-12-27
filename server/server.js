import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log("connected");

  socket.on("send-changes", (delta) => {
    socket.broadcast.emit("receive-changes", delta);
  });
});

server.listen(3000, () => {
  console.log("Server is running");
});
