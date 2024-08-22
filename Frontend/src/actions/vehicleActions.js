import api from '../api';

// Fetch Vehicles
export const fetchVehicles = () => async (dispatch) => {
    try {
        const { data } = await api.get('/vehicles');
        dispatch({ type: 'FETCH_VEHICLES_SUCCESS', payload: data });
    } catch (error) {
        console.error(error);
        dispatch({ type: 'FETCH_VEHICLES_FAIL', payload: error.message });
    }
};

// Create Vehicle
export const createVehicle = (vehicle) => async (dispatch) => {
    try {
        const { data } = await api.post('/vehicles', vehicle);
        dispatch({ type: 'CREATE_VEHICLE_SUCCESS', payload: data });
    } catch (error) {
        console.error(error);
        dispatch({ type: 'CREATE_VEHICLE_FAIL', payload: error.message });
    }
};

// Delete Vehicle
export const deleteVehicle = (id) => async (dispatch) => {
    try {
        await api.delete(`/vehicles/${id}`);
        dispatch({ type: 'DELETE_VEHICLE_SUCCESS', payload: id });
    } catch (error) {
        console.error(error);
        dispatch({ type: 'DELETE_VEHICLE_FAIL', payload: error.message });
    }
};
