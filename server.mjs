import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on("triggerNotification", () => {
    const message = "You have a new notification!";
    console.log("Emitting notification:", message);
    io.emit("notification", message);
  });

  socket.on("triggerMenuAdded", () => {
    const message = "A new menu has been added. Check it out!";
    console.log("Emitting menuAdded:", message);
    io.emit("menuAdded", message);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
