const mongoose = require('mongoose');

const driverschema = new mongoose.Schema({
   name: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   phone: { type: String, required: true, unique: true },
   assigned_vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', default: null },
});

module.exports = mongoose.model('Driver', driverschema);
