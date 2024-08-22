const mongoose = require('mongoose');

const assignmentschema = new mongoose.Schema({
    driver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
    vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
});

module.exports = mongoose.model('Assignment', assignmentschema);
