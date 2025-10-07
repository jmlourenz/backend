const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const User = require('../models/User');

// 📸 Save student photo (with compression)
router.post('/', async (req, res) => {
  const { idNumber, photoURL } = req.body;

  if (!idNumber || !photoURL) {
    return res.status(400).json({ error: 'ID number and photoURL are required' });
  }

  try {
    // 🔍 Hanapin student kahit uppercase/lowercase
    const student = await User.findOne({
      idNumber: Number(idNumber),
      role: { $regex: /^student$/i },
    });

    if (!student) {
      console.log(`❌ Student not found for ID: ${idNumber}`);
      return res.status(404).json({ error: 'Student not found' });
    }

    // 🧩 Alisin ang prefix "data:image/jpg;base64,"
    const base64Data = photoURL.replace(/^data:image\/\w+;base64,/, '');
    const imgBuffer = Buffer.from(base64Data, 'base64');

    // 🗜️ Compress image using sharp
    const compressedBuffer = await sharp(imgBuffer)
      .resize(400) // limit to 400px width (auto height)
      .jpeg({ quality: 60 }) // compress to 60% quality
      .toBuffer();

    // Convert back to base64
    const compressedBase64 = `data:image/jpeg;base64,${compressedBuffer.toString('base64')}`;

    // 💾 Save compressed photo
    student.photoURL = compressedBase64;
    await student.save();

    console.log(`✅ Photo saved & compressed for ID: ${idNumber}`);
    res.json({
      message: 'Photo saved successfully (compressed)',
      student,
    });
  } catch (err) {
    console.error('🔥 Error saving photo:', err);
    res.status(500).json({ error: 'Server error while saving photo' });
  }
});

module.exports = router;
