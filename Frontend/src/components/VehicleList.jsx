import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVehicles, deleteVehicle } from '../actions/vehicleActions';

const VehicleList = () => {
    const dispatch = useDispatch();
    const vehicles = useSelector(state => state.vehicles.vehicles);

    useEffect(() => {
        dispatch(fetchVehicles());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteVehicle(id));
    };

    return (
        <div>
            <h2>Vehicle Management</h2>
            <ul>
                {vehicles.map(vehicle => (
                    <li key={vehicle._id}>
                        {vehicle.make_model} - {vehicle.license_plate}
                        <button onClick={() => handleDelete(vehicle._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VehicleList;
