import {
    FETCH_DIRECTIONS_SUCCESS,
    FETCH_DIRECTIONS_REQUEST,
} from './action-types';
import {API_KEY} from '../config/config';
import Polyline from '@mapbox/polyline';

const fetchDirectionsRequest = () => (
    {
        type: FETCH_DIRECTIONS_REQUEST,
        payload: { isLoading: true },
    }
);

export function getPoints(route) {
    let pointArray = [];
    const polyArray = route.legs[0].steps;
    for (let i = 0; i < polyArray.length; i += 1) {
        const points = Polyline.decode(polyArray[i].polyline.points);
        pointArray = pointArray.concat(points);
    }
    const directions = pointArray.map(point => ({
        latitude: point[0],
        longitude: point[1],
    }));
    return directions;
}


const fetchDirectionsSuccess =
    (coordinates, directions, duration, bounds) => (
        {
            type: FETCH_DIRECTIONS_SUCCESS,
            payload: {
                coordinates, directions, duration, bounds,
            },
        }
    );

export const fetchDirections = (startCoordinates, viaCoordinates, endCoordinates) => (
    async(dispatch) => {
        dispatch(fetchDirectionsRequest());
        const start = `${startCoordinates.latitude},${startCoordinates.longitude}`;
        const via = `${viaCoordinates.latitude},${viaCoordinates.longitude}`;
        const end = `${endCoordinates.latitude},${endCoordinates.longitude}`;
        return fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${via}&destination=${end}&key=${API_KEY}`)
            .then(
                response => response.json(),
                error => console.log('error', error),
            )
            .then((myJson) => {
                const dir = getPoints(myJson.routes[0]);
                const duration = myJson.routes[0].legs[0].duration.value;
                const bounds = myJson.routes[0].bounds;
                dispatch(fetchDirectionsSuccess(endCoordinates, dir, duration, bounds));
            });
    }
);