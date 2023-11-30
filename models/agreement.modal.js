const mongoose = require('mongoose');

const agreementSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
});

const AgreementModel = mongoose.model('Agreement', agreementSchema);

module.exports = AgreementModel;