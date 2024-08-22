const initialState = {
    vehicles: [],
    error: null,
};

export default function vehicleReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_VEHICLES_SUCCESS':
            return { ...state, vehicles: action.payload };
        case 'FETCH_VEHICLES_FAIL':
            return { ...state, error: action.payload };
        case 'CREATE_VEHICLE_SUCCESS':
            return { ...state, vehicles: [...state.vehicles, action.payload] };
        case 'DELETE_VEHICLE_SUCCESS':
            return { ...state, vehicles: state.vehicles.filter(vehicle => vehicle._id !== action.payload) };
        default:
            return state;
    }
}
