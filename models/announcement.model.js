const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
});

const AnnouncementModel = mongoose.model('Announcement', announcementSchema);

module.exports = AnnouncementModel;