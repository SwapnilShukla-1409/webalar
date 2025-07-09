const express = require('express');
const ActionLog = require('../models/ActionLog');
const router = express.Router();

router.get('/', async (req, res) => {
  const actions = await ActionLog.find().sort({ timestamp: -1 }).limit(20);
  res.json(actions);
});

module.exports = router;
