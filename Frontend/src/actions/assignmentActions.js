import api from '../api';

// Fetch Assignments
export const fetchAssignments = () => async (dispatch) => {
    try {
        const { data } = await api.get('/assignments');
        dispatch({ type: 'FETCH_ASSIGNMENTS_SUCCESS', payload: data });
    } catch (error) {
        console.error(error);
        dispatch({ type: 'FETCH_ASSIGNMENTS_FAIL', payload: error.message });
    }
};

// Create Assignment
export const createAssignment = (assignment) => async (dispatch) => {
    try {
        const { data } = await api.post('/assignments', assignment);
        dispatch({ type: 'CREATE_ASSIGNMENT_SUCCESS', payload: data });
    } catch (error) {
        console.error(error);
        dispatch({ type: 'CREATE_ASSIGNMENT_FAIL', payload: error.message });
    }
};
