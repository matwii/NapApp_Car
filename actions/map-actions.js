import {
    FETCH_PICKUP_DIRECTIONS_SUCCESS,
    FETCH_DIRECTIONS_REQUEST,
    FETCH_DESTINATION_DIRECTIONS_SUCCESS
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


const fetchPickupDirectionsSuccess =
    (coordinates, directions, duration, bounds) => (
        {
            type: FETCH_PICKUP_DIRECTIONS_SUCCESS,
            payload: {
                coordinates, directions, duration, bounds,
            },
        }
    );

const fetchDestinationDirectionsSuccess =
    (coordinates, directions, duration, bounds) => (
        {
            type: FETCH_DESTINATION_DIRECTIONS_SUCCESS,
            payload: {
                coordinates, directions, duration, bounds,
            },
        }
    );

export const fetchPickupDirections = (startCoordinates, viaCoordinates) => (
    async(dispatch) => {
        dispatch(fetchDirectionsRequest());
        const start = `${startCoordinates.latitude},${startCoordinates.longitude}`;
        const via = `${viaCoordinates.latitude},${viaCoordinates.longitude}`;
        return fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${via}&key=${API_KEY}`)
            .then(
                response => response.json(),
                error => console.log('error', error),
            )
            .then((myJson) => {
                const dir = getPoints(myJson.routes[0]);
                const duration = myJson.routes[0].legs[0].duration.value;
                const bounds = myJson.routes[0].bounds;
                dispatch(fetchPickupDirectionsSuccess(viaCoordinates, dir, duration, bounds));
            });
    }
);

export const fetchDestinationDirections = (viaCoordinates, endCoordinates) => (
    async(dispatch) => {
        const start = `${viaCoordinates.latitude},${viaCoordinates.longitude}`;
        const via = `${endCoordinates.latitude},${endCoordinates.longitude}`;
        return fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${via}&key=${API_KEY}`)
            .then(
                response => response.json(),
                error => console.log('error', error),
            )
            .then((myJson) => {
                const dir = getPoints(myJson.routes[0]);
                const duration = myJson.routes[0].legs[0].duration.value;
                const bounds = myJson.routes[0].bounds;
                dispatch(fetchDestinationDirectionsSuccess(endCoordinates, dir, duration, bounds));
            });
    }
)