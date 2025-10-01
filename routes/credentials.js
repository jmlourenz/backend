const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
  const { idNumber, email, password } = req.body;

  if (!idNumber || !email || !password) {
    return res.status(400).json({ error: 'ID, email, and password are required' });
  }

  try {
    const student = await User.findOne({ idNumber: Number(idNumber), role: 'student' });
    if (!student) return res.status(404).json({ error: 'Student not found' });

    if (student.email || student.password) {
      return res.status(400).json({ error: 'Student already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    student.email = email;
    student.password = hashedPassword;
    await student.save();

    const { password: _, ...studentInfo } = student._doc;
    res.json({ message: 'Registration successful', student: studentInfo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
