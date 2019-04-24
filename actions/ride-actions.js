import {
    FETCH_RIDES_REQUEST,
    FETCH_RIDES_ERROR,
    FETCH_RIDES_SUCCESS
} from './action-types'
import {fetchPickupDirections, fetchDestinationDirections} from "./map-actions";

/**
 * Tells redux store that we started a request for rides, this will start the loading state.
 */
const fetchRidesRequest = () => (
    {
        type: FETCH_RIDES_REQUEST,
        payload: {isLoading: true},
    }
);

/**
 * If fetch rides, we dispatch a success state to redux store.
 * @param rides
 * @returns {{type: string, payload: {rides: *}}}
 */
const fetchRidesSuccess = (rides) => (
    {
        type: FETCH_RIDES_SUCCESS,
        payload: {rides},
    }
);

/**
 * Fetches the rides for this car from the database.
 * If it gets an array of cars, it will render the directions on the map.
 * @returns {Function}
 */
export const fetchRides  = () => (
    async (dispatch, getState) => {
        const {socket, carId} = getState().auth;
        dispatch(fetchRidesRequest())
        socket.on('car_rides_'+carId, async (rides) => {
            console.log(rides);
            if (rides.length > 0) {
                const firstRide = rides[rides.length - 1];
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
                await dispatch(fetchRidesSuccess(rides));
                await dispatch(fetchPickupDirections(startCoordinates, viaCoordinates));
                dispatch(fetchDestinationDirections(viaCoordinates, endCoordinates));
            }
        })
    }
);