import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import loggingMiddleware from './middleware/logging';
import socketMiddleware from './middleware/socket-middleware';

const configureStore = (initialState) => {
    const middleware = applyMiddleware(thunk, loggingMiddleware, socketMiddleware());

    return createStore(rootReducer, initialState, middleware);
};

export default configureStore;