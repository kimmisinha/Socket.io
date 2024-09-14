import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
const port = 3001;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
// app.get("/", (req, res) => {
//   res.send("hello world");
// });

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  socket.on("message", (data) => {
    console.log("message");
  });
  socket.on("disconnect", () => {
    console.log("user Got disconnect", socket.id);
  });
  // socket.emit("Welcome",`welcome to server ${socket.id}`)
  // socket.broadcast.emit("user has joined",`user has joined ${socket.id}`)
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
