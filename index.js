const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const connectToDatabase = require('./config/mongoose.config');

// Mongoose connection
connectToDatabase();

// Middleware and CORS setup
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://serenity-heaven-client-c3712.web.app',
    'https://serenity-heaven-client-c3712.firebaseapp.com',
  ],
  credentials: true,
}));
app.use(express.json());

// Collections
const User = require('./models/user.model');
const Apartment = require('./models/apartment.model');
const Agreement = require('./models/agreement.model');
const Announcement = require('./models/announcement.model');
const Coupon = require('./models/coupon.model');
const Payment = require('./models/payment.model');

// Middlewares 
const verifyToken = (req, res, next) => {
  console.log('inside verify token', req.headers.authorization);
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'unauthorized access' });
  }
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'unauthorized access' });
    }
    req.decoded = decoded;
    next();
  });
};

// Use verify admin after verifyToken
const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  try {
    const user = await User.findOne({ email: email });
    const isAdmin = user?.role === 'admin';
    if (!isAdmin) {
      return res.status(403).send({ message: 'forbidden access' });
    }
    next();
  } catch (error) {
    console.error('Error verifying admin:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

// Import routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const announcementRoutes = require('./routes/announcement.routes');
const paymentRoutes = require('./routes/payment.routes');
const createIntentRoutes = require('./routes/create-payment-intent.routes');
const couponRoutes = require('./routes/coupon.routes');
const apartmentRoutes = require('./routes/apartment.routes');
const agreementRoutes = require('./routes/agreement.routes');

// Use routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/payments', paymentRoutes);
app.use('/announcements', announcementRoutes);
app.use('/coupons', couponRoutes);
app.use('/apartments', apartmentRoutes);
app.use('/agreements', agreementRoutes);
app.use('/create-payment-intent', createIntentRoutes);
// Use other routes...

// Root route
app.get('/', (req, res) => {
  res.send('Boss is sitting');
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Bistro boss is sitting on port ${port}`);
});
