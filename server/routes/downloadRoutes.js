
const express = require('express');
const path = require('path');
const Download = require('../models/Download');

const router = express.Router();

// Resume download route
router.get('/:token', async (req, res) => {
  try {
    const token = req.params.token;

    // Token check in DB
    const entry = await Download.findOne({ token });

    if (!entry) {
      return res.status(404).json({ error: 'Invalid or expired download link.' });
    }

    // Expiry check (24 hours validity)
    if (entry.expiresAt < new Date()) {
      return res.status(410).json({ error: 'Link expired. Please purchase again.' });
    }

    // Allow multiple downloads (within 24 hours)
    const filePath = path.join(__dirname, '../assets/resume.pdf');
    return res.download(filePath);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
