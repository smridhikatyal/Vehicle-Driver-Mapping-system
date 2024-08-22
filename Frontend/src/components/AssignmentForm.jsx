import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAssignment, fetchAssignments } from '../actions/assignmentActions';
import { fetchDrivers } from '../actions/driverActions';
import { fetchVehicles } from '../actions/vehicleActions';

const AssignmentForm = () => {
    const dispatch = useDispatch();
    const drivers = useSelector(state => state.driver.drivers);
    const vehicles = useSelector(state => state.vehicle.vehicles);
    const assignments = useSelector(state => state.assignment.assignments);
    const [selectedDriver, setSelectedDriver] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        dispatch(fetchDrivers());
        dispatch(fetchVehicles());
        dispatch(fetchAssignments()); // Fetch existing assignments
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!selectedDriver || !selectedVehicle || !startTime || !endTime) {
            setError('All fields are required.');
            return;
        }

        // Convert times to Date objects for comparison
        const start = new Date(startTime);
        const end = new Date(endTime);

        // Check for time collision
        const hasCollision = assignments.some(assignment => {
            const existingStart = new Date(assignment.start_time);
            const existingEnd = new Date(assignment.end_time);

            return (
                assignment.driver_id === selectedDriver &&
                ((start >= existingStart && start <= existingEnd) ||
                (end >= existingStart && end <= existingEnd) ||
                (start <= existingStart && end >= existingEnd))
            );
        });

        if (hasCollision) {
            setError('The driver is already assigned to a vehicle during this time.');
            return;
        }

        // Proceed to create assignment
        dispatch(createAssignment({ driver_id: selectedDriver, vehicle_id: selectedVehicle, start_time: startTime, end_time: endTime }));
    };

    return (
        <div>
            <h2>Assign Vehicle to Driver</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Driver:
                    <select value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)} required>
                        <option value="">Select Driver</option>
                        {drivers.map(driver => (
                            <option key={driver._id} value={driver._id}>{driver.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Vehicle:
                    <select value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)} required>
                        <option value="">Select Vehicle</option>
                        {vehicles.map(vehicle => (
                            <option key={vehicle._id} value={vehicle._id}>{vehicle.make_model}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Start Time:
                    <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                </label>
                <label>
                    End Time:
                    <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                </label>
                <button type="submit">Assign</button>
            </form>
        </div>
    );
};

export default AssignmentForm;
