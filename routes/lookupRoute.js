const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { idNumber } = req.body;
  if (!idNumber) return res.status(400).json({ error: 'ID number is required' });

  try {
    const student = await User.findOne({ idNumber: Number(idNumber), role: 'student' });
    if (!student) return res.status(404).json({ error: 'ID not found' });

    const { password, email, ...studentInfo } = student._doc;
    res.json({ message: 'Student found', student: studentInfo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
