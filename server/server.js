require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const notesRouter = require("./routes/note");
const workspaceRouter = require("./routes/workspace");

const noteSockets = require("./sockets/noteSockets");
const workspaceSockets = require("./sockets/workspaceSockets");

const removeMember = require("./utils/updateMembers").removeMember;

const allowedOrigins = process.env.CORS_ORIGINS.split(",") || [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// Middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/workspace", workspaceRouter);
app.use("/api/note", notesRouter);

// Socket.IO
io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  noteSockets(io, socket);
  workspaceSockets(io, socket);
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
