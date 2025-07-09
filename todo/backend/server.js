const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const socketIo = require("socket.io");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const actionRoutes = require("./routes/actionRoutes");
const { logAction } = require("./utils/logger");

dotenv.config();

// ✅ Initialize app FIRST
const app = express();

// ✅ Then create server from app
const server = http.createServer(app);

// ✅ Then initialize Socket.IO
const io = socketIo(server, { cors: { origin: "*" } });
app.set("io", io); // Make io accessible in routes

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes
app.get("/", (req, res) => res.send("✅ Server is running"));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/actions", actionRoutes);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ WebSocket connection handler
io.on("connection", (socket) => {
  console.log("🔌 Client connected");

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
