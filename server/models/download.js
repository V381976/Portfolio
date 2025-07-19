const mongoose = require('mongoose');

const DownloadSchema = new mongoose.Schema({
  email: String,
  token: String,
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
  isDownloaded: { type: Boolean, default: false }
});

module.exports = mongoose.model('Download', DownloadSchema);
