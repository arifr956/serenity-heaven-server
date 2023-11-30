const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
});

const CouponModel = mongoose.model('Coupon', couponSchema);

module.exports = CouponModel;