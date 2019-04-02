import {combineReducers} from 'redux';
import mapReducer from './map-reducer';
import authReducer from './auth-reducer';

// Root Reducer
const rootReducer = combineReducers({
    map: mapReducer,
    auth: authReducer
});

export default rootReducer;