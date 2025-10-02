const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { idNumber } = req.body;
  if (!idNumber) {
    return res.status(400).json({ error: 'ID number is required' });
  }

  try {
    // hanap student gamit lean() para mabilis
    const student = await User.findOne(
      { idNumber: idNumber, role: 'student' }
    ).select('-password -email -__v').lean();

    if (!student) {
      return res.status(404).json({ error: 'ID not found' });
    }

    res.json({
      message: 'Student found',
      student,
    });
  } catch (err) {
    console.error('Lookup error:', err);
    res.status(500).json({ error: 'Server error, please try again' });
  }
});

module.exports = router;
