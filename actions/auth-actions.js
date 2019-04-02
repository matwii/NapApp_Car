import {
    AUTH_ERROR,
    AUTH_REQUEST,
    AUTH_SUCCESS,
    SIGN_OUT
} from './action-types';
import {AsyncStorage} from 'react-native'
import api from "../services/api";

const fetchAuthRequest = () => (
    {
        type: AUTH_REQUEST,
        payload: {isLoading: true},
    }
);

const fetchAuthError = () => (
    {
        type: AUTH_ERROR,
        payload: {error: true},
    }
);

export const fetchAuthSuccess = (carId, token) => (
    {
        type: AUTH_SUCCESS,
        payload: {carId, token, isAuthenticated: true}
    }
);

const signOutSuccess = () => (
    {
        type: SIGN_OUT
    }
);

export const signIn = (regNr) => (
    async (dispatch) => {
        const response = await api.login(regNr);
        if (response.error) {
            return dispatch(fetchAuthError())
        }
        await dispatch(fetchAuthSuccess(response.data.id, response.data.token));
        await AsyncStorage.setItem('token', response.data.token);
        AsyncStorage.setItem('id', JSON.stringify(response.data.id));
    }
)