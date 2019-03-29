import {
    FETCH_LOCATION_ERROR,
    FETCH_LOCATION_REQUEST,
    SET_REGION,
} from '../actions/action-types';
import {MapView} from 'expo'

const initialState = {
    region: {
        latitude: 63.421158,
        longitude: 10.405551,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    },
    isLoading: true,
    error: false,
};

const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_REGION:
            return {
                ...state,
                isLoading: false,
                error: false,
                region: action.payload.region
            };
        case FETCH_LOCATION_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case FETCH_LOCATION_ERROR: {
            return {
                ...state,
                error: true,
                isLoading: false
            };
        }
        default:
            return state
    }
};

export default mapReducer