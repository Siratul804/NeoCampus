import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware ⁠ hostname ⁠ and ⁠ port ⁠ must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("triggerMenuAdded", () => {
      console.log("Received triggerMenuAdded event"); // Ensure this logs when the button is clicked
      io.emit("menuAdded", "New menu added");
    });
    socket.on("triggerMenuAdded", () => {
      console.log("Received triggerMenuAdded event"); // Debug log
      io.emit("menuAdded", "New menu added");
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
