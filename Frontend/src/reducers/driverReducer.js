const initialState = {
    drivers: [],
    error: null,
};

export default function driverReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_DRIVERS_SUCCESS':
            return { ...state, drivers: action.payload };
        case 'FETCH_DRIVERS_FAIL':
            return { ...state, error: action.payload };
        case 'CREATE_DRIVER_SUCCESS':
            return { ...state, drivers: [...state.drivers, action.payload] };
        case 'DELETE_DRIVER_SUCCESS':
            return { ...state, drivers: state.drivers.filter(driver => driver._id !== action.payload) };
        case 'UPDATE_DRIVER_SUCCESS':
            return {
                ...state,
                drivers: state.drivers.map(driver =>
                    driver._id === action.payload._id ? action.payload : driver
                ),
            };
        default:
            return state;
    }
}
