import { connect } from 'react-redux';
import MainScreen from '../screens/MainScreen';
import { startBackgroundFetch } from '../actions/background-actions';
import { fetchRides } from "../actions/ride-actions";

const mapStateToProps = (state) => ({
    region: state.map.region,
    isLoading: state.map.isLoading,
    rides: state.rides.rides
});

const mapDispatchToProps = (dispatch) => ({
    startBackgroundFetch: () => dispatch(startBackgroundFetch()),
    fetchRides: () => dispatch(fetchRides())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MainScreen);