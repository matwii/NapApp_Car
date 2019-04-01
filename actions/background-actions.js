import {
    SET_REGION,
    FETCH_LOCATION_ERROR,
    FETCH_LOCATION_REQUEST,
} from './action-types';
import {Location, TaskManager, Permissions} from 'expo';

const LOCATION_TASK_NAME = 'background-location-task';


export const setCurrentRegion = (region) => (
    {
        type: SET_REGION,
        payload: {region},
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
            dispatch(taskManager())
        } else {
            dispatch(fetchLocationError());
            throw new Error('Location permission not granted');
        }
    }
);

/**
 * Defines the task for background fetching, everytime the task gets location data it stores it in redux state
 * @returns {Function}
 */
const taskManager = () => (
    async (dispatch) => {

    }
);