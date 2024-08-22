import { configureStore } from '@reduxjs/toolkit';
import assignmentReducer from './reducers/assignmentReducer';
import driverReducer from './reducers/driverReducer';
import vehicleReducer from './reducers/vehicleReducer';

// Configure the store
const store = configureStore({
    reducer: {
        drivers: driverReducer,
        vehicles: vehicleReducer,
        assignments: assignmentReducer,
    },
});

export default store;
