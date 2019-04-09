import {
    SET_REGION,
    FETCH_LOCATION_ERROR,
    FETCH_LOCATION_REQUEST,
    SET_SOCKET
} from './action-types';
import {Location, TaskManager, Permissions} from 'expo';

const LOCATION_TASK_NAME = 'background-location-task';

export const setCurrentRegion = (region) => (
    {
        type: SET_REGION,
        payload: {region},
    }
);

export const setSocket = () => (
    {
        type: SET_SOCKET,
    }
);

export const fetchLocationError = () => (
    {
        type: FETCH_LOCATION_ERROR,
        payload: {error: true},
    }
);

export const fetchLocationRequest = () => (
    {
        type: FETCH_LOCATION_REQUEST,
        payload: {isLoading: true},
    }
);

export const updateCarPosition = (region, carId,  token) => (
    async (dispatch, getState) => {
        const {socket} = await getState().auth;
        dispatch(setCurrentRegion(region));
        //const response = await api.updateCarPosition(carId, token, region.latitude, region.longitude);
        socket.emit('updateCarPosition', carId, token, region.latitude, region.longitude);
    }
);

/**
 * Initiates background location fetching for each 10th second.
 * @returns {Function}
 */
export const startBackgroundFetch = () => (
    async (dispatch) => {
        dispatch(fetchLocationRequest());
        const {Location, Permissions} = Expo;
        // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
        const {status, permissions} = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
                accuracy: Location.Accuracy.High,
                timeInterval: 10000,
                distanceInterval: 0
            });
        } else {
            dispatch(fetchLocationError());
            throw new Error('Location permission not granted');
        }
    }
);
