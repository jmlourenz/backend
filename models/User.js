const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  role: { type: String, enum: ['student', 'ssc_admin', 'oss_admin', 'super_admin'], required: true },
  idNumber: { type: Number, unique: true }, // student
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  course: { type: String },
  yearLevel: { type: String },
  section: { type: String },
  photoURL: { type: String }, // para sa realtime capture
  qrCode: { type: String },   // para sa QR code
  email: { type: String, unique: true, sparse: true }, // puwede null muna
  password: { type: String },
});

module.exports = mongoose.model('User', UserSchema);
