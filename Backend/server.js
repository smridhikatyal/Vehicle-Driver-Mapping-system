const express = require('express');
const app = express();
const db = require('./db');
const cors = require('cors')
const bodyParser = require('body-parser');
const Driver = require('./Models/driverschema');
const path = require('path');
const Vehicle = require('./Models/vehicleschema');

const Assignment = require('./Models/assignmentschema');
app.use(cors());
app.use(bodyParser.json());

app.get('/drivers', async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/drivers', async (req, res) => {
    const driver = new Driver(req.body);
    try {
        const newDriver = await driver.save();
        res.status(201).json(newDriver);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/drivers/:id', async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id);
        if (!driver) return res.status(404).json({ message: 'Driver not found' });
        Object.assign(driver, req.body);
        const updatedDriver = await driver.save();
        res.json(updatedDriver);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/drivers/:id', async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id);
        if (!driver) return res.status(404).json({ message: 'Driver not found' });
        await driver.remove();
        res.json({ message: 'Driver deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Vehicle Routes
app.get('/vehicles', async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/vehicles', async (req, res) => {
    const vehicle = new Vehicle(req.body);
    try {
        const newVehicle = await vehicle.save();
        res.status(201).json(newVehicle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/vehicles/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
        await vehicle.remove();
        res.json({ message: 'Vehicle deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Assignment Routes
app.get('/assignments', async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.json(assignments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/assignments', async (req, res) => {
    const { driver_id, vehicle_id, start_time, end_time } = req.body;

    try {
        const overlappingAssignments = await Assignment.find({
            driver_id,
            $or: [
                { start_time: { $lte: new Date(end_time) }, end_time: { $gte: new Date(start_time) } }
            ]
        });

        if (overlappingAssignments.length > 0) {
            return res.status(400).json({ message: 'Assignment overlaps with existing assignments' });
        }

        const assignment = new Assignment({ driver_id, vehicle_id, start_time, end_time });
        const newAssignment = await assignment.save();
        res.status(201).json(newAssignment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(4000 , ()=>{
    console.log('listening to the port 4000');  
  });

// // Create a new driver
// app.post('/drivers', async (req, res) => {
//     try {
//         const driver = new Driver(req.body);
//         await driver.save();
//         res.status(201).send(driver);
//     } catch (error) {
//         res.status(400).send(error);
//     }
//  });
 
//  // Edit a driver
//  app.put('/drivers/:id', async (req, res) => {
//     try {
//         const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.send(driver);
//     } catch (error) {
//         res.status(400).send(error);
//     }
//  });
 
//  // Delete a driver
//  app.delete('/drivers/:id', async (req, res) => {
//     try {
//         await Driver.findByIdAndDelete(req.params.id);
//         res.send({ message: 'Driver deleted' });
//     } catch (error) {
//         res.status(400).send(error);
//     }
//  });
 
//  // Search drivers by name or phone
//  app.get('/drivers', async (req, res) => {
//     const { search } = req.query;
//     try {
//         const drivers = await Driver.find({ 
//             $or: [
//                 { name: { $regex: search, $options: 'i' } },
//                 { phone: { $regex: search, $options: 'i' } },
//             ]
//         });
//         res.send(drivers);
//     } catch (error) {
//         res.status(400).send(error);
//     }
//  });


//  //get all vehicles
// app.get('/vehicles', async (req, res) => {
//     try {
//         const vehicles = await Vehicle.find();
//         res.send(vehicles);
//     } catch (error) {
//         res.status(400).send(error);
//     }
//  });

//  app.post('/assign', async (req, res) => {
//     const { driver_id, vehicle_id, start_time, end_time } = req.body;
 
//     // Check for conflicts
//     const conflict = await Driver.findOne({
//         _id: driver_id,
//         assigned_vehicle_id: { $ne: null },
//         start_time: { $lt: end_time },
//         end_time: { $gt: start_time }
//     });
 
//     if (conflict) {
//         return res.status(400).send({ message: 'Driver already assigned to another vehicle during this time.' });
//     }
 
//     try {
//         const driver = await Driver.findByIdAndUpdate(driver_id, { assigned_vehicle_id: vehicle_id }, { new: true });
//         res.send(driver);
//     } catch (error) {
//         res.status(400).send(error);
//     }
//  });
 
//  // Unassign a driver from a vehicle
//  app.delete('/unassign/:driver_id', async (req, res) => {
//     try {
//         const driver = await Driver.findByIdAndUpdate(req.params.driver_id, { assigned_vehicle_id: null }, { new: true });
//         res.send(driver);
//     } catch (error) {
//         res.status(400).send(error);
//     }
//  });

// Driver Routes