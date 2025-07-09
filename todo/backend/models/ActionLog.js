const mongoose = require("mongoose");

const actionLogSchema = new mongoose.Schema({
  action: { type: String, required: true },        // e.g. Created task "Homepage"
  user: { type: String, required: true },          // username or email
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" }, // optional
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ActionLog", actionLogSchema);
