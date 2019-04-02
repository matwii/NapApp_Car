import io from 'socket.io-client';
import {HOST} from '../../config/config'

/**
 * The middleware will check if the action has other specific attributes and handle that action differently than
 * the others. That way all we have to do to trigger some custom redux behavior is dispatch an
 * action with our specific attributes and it will automatically be handled differently.
 * @returns {function({dispatch?: *}): function(*): Function}
 */
export default function socketMiddleware() {
    const socket = io(`${HOST}`, { forceNew: true });

    return ({ dispatch }) => next => (action) => {
        //Skips the middleware if the action is a function
        if (typeof action === 'function') {
            return next(action);
        }

        const {
            event,
            leave,
            handle,
            ...rest
        } = action;

        //Skips the middleware if there is no event attribute in our action
        if (!event) {
            return next(action);
        }

        //Remove listener if there is a leave attribute
        if (leave) {
            socket.removeListener(event);
        }

        /**
         * check if the handle attribute is a string. And if it is, we are changing its value to a function that
         * dispatches a new action with the received data. So basically our received attribute can take both an action
         * type string or an actual function. This gives us an extra level of control over how we handle the data coming
         * in from the socket.io server.
         */
        let handleEvent = handle;
        if (typeof handleEvent === 'string') {
            handleEvent = result => dispatch({ type: handle, result, ...rest });
        }
        return socket.on(event, handleEvent);
    };
}