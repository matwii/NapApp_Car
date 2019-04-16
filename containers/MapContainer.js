import { connect } from 'react-redux';
import MainScreen from '../screens/MainScreen';
import { startBackgroundFetch, setSocket, signOut } from '../actions/background-actions';
import { fetchRides } from "../actions/ride-actions";

const mapStateToProps = (state) => ({
    region: state.map.region,
    isLoading: state.map.isLoading,
    rides: state.rides.rides,
    socket: state.auth.socket,
    directions: state.map.routeToPickup.concat(state.map.routeToDestination),
    pickupCoordinates: state.map.pickupCoordinates,
    destinationCoordinates: state.map.destinationCoordinates
});

const mapDispatchToProps = (dispatch) => ({
    startBackgroundFetch: () => dispatch(startBackgroundFetch()),
    fetchRides: () => dispatch(fetchRides()),
    setSocket: () => dispatch(setSocket()),
    signOut: () => dispatch(signOut())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MainScreen);