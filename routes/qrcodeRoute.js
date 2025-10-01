const express = require('express');
const router = express.Router();
const User = require('../models/User');
const QRCode = require('qrcode');

router.post('/', async (req, res) => {
  const { idNumber } = req.body;

  if (!idNumber) return res.status(400).json({ error: 'ID number is required' });

  try {
    const student = await User.findOne({ idNumber: Number(idNumber), role: 'student' });
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const qrData = {
      idNumber: student.idNumber,
      firstName: student.firstName,
      middleName: student.middleName,
      lastName: student.lastName,
      age: student.age,
      course: student.course,
      yearLevel: student.yearLevel,
      section: student.section,
      photoURL: student.photoURL
    };

    const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(qrData));
    student.qrCode = qrCodeDataURL;
    await student.save();

    res.json({ message: 'QR code generated', qrCode: qrCodeDataURL });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
