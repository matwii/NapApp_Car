import {
    AUTH_SUCCESS,
    AUTH_REQUEST,
    AUTH_ERROR,
    SIGN_OUT
} from '../actions/action-types';
import io from "socket.io-client";
import {HOST} from '../config/config';

const initialState = {
    isLoading: false,
    error: false,
    isAuthenticated: false,
    carId: null,
    token: '',
    socket: io(`${HOST}`, { forceNew: true })
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_REQUEST: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case AUTH_ERROR: {
            return {
                ...state,
                isLoading: false,
                error: true,
            };
        }
        case AUTH_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: false,
                carId: action.payload.carId,
                token: action.payload.token,
                isAuthenticated: true
            };
        }
        case SIGN_OUT: {
            return initialState
        }
        default:
            return state
    }
};

export default authReducer;