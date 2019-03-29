import { connect } from 'react-redux';
import MainScreen from '../screens/MainScreen';
import { startBackgroundFetch } from '../actions/background-actions';

const mapStateToProps = (state) => ({
    region: state.map.region,
    isLoading: state.map.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
    startBackgroundFetch: () => dispatch(startBackgroundFetch())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MainScreen);