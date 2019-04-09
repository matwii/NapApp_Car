import {
    FETCH_RIDES_REQUEST,
    FETCH_RIDES_ERROR,
    FETCH_RIDES_SUCCESS
} from './action-types'
import {fetchDirections} from "./map-actions";

const fetchRidesRequest = () => (
    {
        type: FETCH_RIDES_REQUEST,
        payload: {isLoading: true},
    }
);

const fetchRidesSuccess = (rides) => (
    {
        type: FETCH_RIDES_SUCCESS,
        payload: {rides},
    }
);

export const fetchRides  = () => (
    async (dispatch, getState) => {
        const {socket, carId} = getState().auth;
        dispatch(fetchRidesRequest())
        socket.on('car_rides_'+carId, async (rides) => {
            const firstRide = rides.pop();
            const startCoordinates = {
                latitude: firstRide.start_latitude,
                longitude: firstRide.start_longitude
            };
            const viaCoordinates = {
                latitude: firstRide.via_latitude,
                longitude: firstRide.via_longitude
            };
            const endCoordinates = {
                latitude: firstRide.end_latitude,
                longitude: firstRide.end_longitude
            };
            console.log(startCoordinates, viaCoordinates)
            await dispatch(fetchRidesSuccess(rides));
            dispatch(fetchDirections(startCoordinates, viaCoordinates))
        })
    }
);