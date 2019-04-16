import {
    FETCH_LOCATION_ERROR,
    FETCH_LOCATION_REQUEST,
    SET_REGION,
    FETCH_PICKUP_DIRECTIONS_SUCCESS,
    FETCH_DESTINATION_DIRECTIONS_SUCCESS, SIGN_OUT
} from '../actions/action-types';

const initialState = {
    region: {
        latitude: 63.421158,
        longitude: 10.405551,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    },
    isLoading: true,
    error: false,
    routeToDestination: [],
    timeToDestination: 0,
    destinationCoordinates: null,
    destinationBounds: null,
    routeToPickup: [],
    timeToPickup: 0,
    pickupCoordinates: null,
    pickupBounds: null
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
        case FETCH_PICKUP_DIRECTIONS_SUCCESS:
            return {
                ...state,
                routeToPickup: action.payload.directions,
                timeToPickup: action.payload.duration,
                pickupCoordinates: action.payload.coordinates,
                pickupBounds: action.payload.bounds,
                afterPickup: false,
            };
        case FETCH_DESTINATION_DIRECTIONS_SUCCESS:
            return {
                ...state,
                routeToDestination: action.payload.directions,
                timeToDestination: action.payload.duration,
                destinationCoordinates: action.payload.coordinates,
                destinationBounds: action.payload.bounds,
                afterPickup: true,
            };
        case SIGN_OUT: {
            return initialState
        }
        default:
            return state
    }
};

export default mapReducer