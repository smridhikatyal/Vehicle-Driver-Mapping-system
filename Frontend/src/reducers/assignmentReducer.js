const initialState = {
    assignments: [],
    error: null,
};

export default function assignmentReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_ASSIGNMENTS_SUCCESS':
            return { ...state, assignments: action.payload };
        case 'FETCH_ASSIGNMENTS_FAIL':
            return { ...state, error: action.payload };
        case 'CREATE_ASSIGNMENT_SUCCESS':
            return { ...state, assignments: [...state.assignments, action.payload] };
        default:
            return state;
    }
}
