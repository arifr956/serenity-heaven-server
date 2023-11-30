const express = require('express');
const router = express.Router();
const AnnouncementModel = require('../models/announcement.model');

router.post('/announcements', verifyToken, verifyAdmin, async (req, res) => {
  const announcementItem = req.body;
  const result = await AnnouncementModel.insertOne(announcementItem);
  res.send(result);
});

router.get('/announcements', async (req, res) => {
  const result = await AnnouncementModel.find();
  res.send(result);
});



module.exports = router;
