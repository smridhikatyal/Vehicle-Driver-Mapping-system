import api from '../api';

// Fetch Drivers
export const fetchDrivers = () => async (dispatch) => {
    try {
        const { data } = await api.get('/drivers');
        console.log("WEWRWR",data);
        dispatch({ type: 'FETCH_DRIVERS_SUCCESS', payload: data });
    } catch (error) {
        console.error(error);
        dispatch({ type: 'FETCH_DRIVERS_FAIL', payload: error.message });
    }
};

// Create Driver
export const createDriver = (driver) => async (dispatch) => {
    try {
        const { data } = await api.post('/drivers', driver);
        dispatch({ type: 'CREATE_DRIVER_SUCCESS', payload: data });
    } catch (error) {
        console.error(error);
        dispatch({ type: 'CREATE_DRIVER_FAIL', payload: error.message });
    }
};

// Update Driver
export const updateDriver = (id, driver) => async (dispatch) => {
    try {
        const { data } = await api.put(`/drivers/${id}`, driver);
        dispatch({ type: 'UPDATE_DRIVER_SUCCESS', payload: data });
    } catch (error) {
        console.error(error);
        dispatch({ type: 'UPDATE_DRIVER_FAIL', payload: error.message });
    }
};

// Delete Driver
export const deleteDriver = (id) => async (dispatch) => {
    try {
        await api.delete(`/drivers/${id}`);
        dispatch({ type: 'DELETE_DRIVER_SUCCESS', payload: id });
    } catch (error) {
        console.error(error);
        dispatch({ type: 'DELETE_DRIVER_FAIL', payload: error.message });
    }
};
