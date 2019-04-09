import {
    FETCH_RIDES_REQUEST,
    FETCH_RIDES_ERROR,
    FETCH_RIDES_SUCCESS
} from './action-types'

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
        socket.on('car_rides_'+carId, (rides) => {
            dispatch(fetchRidesSuccess(rides))
        })
    }
);