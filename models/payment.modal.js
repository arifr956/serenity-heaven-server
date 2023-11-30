const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
});

const PaymentModel = mongoose.model('Payment', paymentSchema);

module.exports = PaymentModel;