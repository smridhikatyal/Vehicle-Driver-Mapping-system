import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDriver, fetchDrivers } from '../actions/driverActions';

const DriverList = () => {
    const dispatch = useDispatch();
    const [drivers,setDrivers] = useState([]);
    const store = useSelector(state => state);

    useEffect(async () => {
        const getDrivers = async () => {
            await fetchDrivers();
        }
        getDrivers();
    }, []);

    useEffect(() => {
        if(store.drivers.drivers)
        setDrivers(store.drivers.drivers);
    },[store])

    const handleDelete = (id) => {
        dispatch(deleteDriver(id));
    };

    return (
        <div>
            <h2>Driver Management</h2>
            <ul>
                {drivers.map(driver => (
                    <li key={driver._id}>
                        {driver.name} - {driver.phone}
                        <button onClick={() => handleDelete(driver._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DriverList;
