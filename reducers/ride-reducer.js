import {
    FETCH_RIDES_REQUEST,
    FETCH_RIDES_SUCCESS,
    FETCH_RIDES_ERROR,
} from '../actions/action-types';

const initialState = {
    rides: [],
    isLoading: false,
    error: false,
};

const rideReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RIDES_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                rides: action.payload.rides
            }
        }
        case FETCH_RIDES_ERROR: {
            return {
                ...state,
                isLoading: false,
                error: true,
            };
        }
        case FETCH_RIDES_REQUEST: {
            return {
                ...state,
                isLoading: true
            };
        }
        default:
            return state
    }
};

export default rideReducer;