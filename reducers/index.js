import {combineReducers} from 'redux';
import mapReducer from './map-reducer';
import authReducer from './auth-reducer';
import rideReducer from './ride-reducer'

// Root Reducer
const rootReducer = combineReducers({
    map: mapReducer,
    auth: authReducer,
    rides: rideReducer
});

export default rootReducer;