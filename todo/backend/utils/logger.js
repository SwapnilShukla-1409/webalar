const ActionLog = require("../models/ActionLog");

async function logAction({ action, user, taskId = null }) {
  try {
    await ActionLog.create({ action, user, taskId });
  } catch (err) {
    console.error("❌ Failed to log action:", err.message);
  }
}

module.exports = { logAction };
