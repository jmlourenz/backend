require('dotenv').config(); // Para mabasa ang MONGO_URI

const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

// Import routes (tugma sa filenames mo)
const lookupRoute = require('./routes/lookupRoute');
const registerRoute = require('./routes/registerRoute');
const loginRoute = require('./routes/loginRoute');
const realtimePhotoRoute = require('./routes/realtimephotoRoute');
const qrcodeRoute = require('./routes/qrcodeRoute');
const credentialsRoute = require('./routes/credentials');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
connectDB();

// Routes
app.use('/api/lookup', lookupRoute);
app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);
app.use('/api/register/photo', realtimePhotoRoute);
app.use('/api/register/qrcode', qrcodeRoute);
app.use('/api/register/credentials', credentialsRoute);

// ✅ Add this health check route (para di “Cannot GET /”)
app.get('/', (req, res) => {
  res.send('🚀 Backend API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
