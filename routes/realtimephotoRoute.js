const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { idNumber, photoURL } = req.body;

  if (!idNumber || !photoURL) {
    return res.status(400).json({ error: 'ID number and photoURL are required' });
  }

  try {
    const student = await User.findOne({ idNumber: Number(idNumber), role: 'student' });
    if (!student) return res.status(404).json({ error: 'Student not found' });

    student.photoURL = photoURL;
    await student.save();

    res.json({ message: 'Photo saved successfully', student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
