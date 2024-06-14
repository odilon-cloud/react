// routes/preferences.js
const express = require('express');
const router = express.Router();
const UserPreference = require('../models/UserPreference');

router.get('/', async (req, res) => {
  const preferences = await UserPreference.find();
  res.send(preferences);
});

router.post('/', async (req, res) => {
  const newPreference = new UserPreference(req.body);
  await newPreference.save();
  res.send(newPreference);
});

module.exports = router;
