const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
});

const ApartmentModel = mongoose.model('Apartment', apartmentSchema);

module.exports = ApartmentModel;