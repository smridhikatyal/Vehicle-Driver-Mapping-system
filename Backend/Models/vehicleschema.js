const mongoose = require('mongoose');

const vehicleschema = new mongoose.Schema({
   vehicle_id:{type:String,required:true},
   make_model: { type: String, required: true },
   license_plate: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Vehicle', vehicleschema);
