import {combineReducers} from 'redux';
import mapReducer from './map-reducer';

// Root Reducer
const rootReducer = combineReducers({
    map: mapReducer,
});

export default rootReducer;