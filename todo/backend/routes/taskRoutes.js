const express = require("express");
const Task = require("../models/Task");
const { logAction } = require("../utils/logger");

const router = express.Router();

// 1) FETCH all tasks
router.get("/", async (req, res) => {
  try {
    // Populate assigned user info if you need it
    const tasks = await Task.find().populate("assignedTo", "username email");
    res.json(tasks);
  } catch (err) {
    console.error("Fetch tasks error:", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// (Optional) FETCH one task by ID
router.get("/:id", async (req, res) => {
  try {
    const task = await Task
      .findById(req.params.id)
      .populate("assignedTo", "username email");
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    console.error("Fetch single task error:", err);
    res.status(500).json({ error: "Failed to fetch task" });
  }
});

// 2) CREATE task
router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();

    const io = req.app.get("io");
    io.emit("taskCreated", task);

    await logAction({
      action: `Created task "${task.title}"`,
      user: req.body.username || "Unknown",
      taskId: task._id
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ error: "Create failed" });
  }
});

// 3) UPDATE task
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    const io = req.app.get("io");
    io.emit("taskUpdated", task);

    await logAction({
      action: `Updated task "${task.title}"`,
      user: req.body.username || "Unknown",
      taskId: task._id
    });

    res.json(task);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Update failed" });
  }
});

// 4) DELETE task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    const io = req.app.get("io");
    io.emit("taskDeleted", req.params.id);

    await logAction({
      action: `Deleted task "${task?.title || "Unknown"}"`,
      user: req.body.username || "Admin",
      taskId: task?._id
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;
