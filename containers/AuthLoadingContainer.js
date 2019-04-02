import { connect } from 'react-redux';
import AuthLoading from '../screens/AuthLoadingScreen';
import { fetchAuthSuccess } from '../actions/auth-actions';


const mapDispatchToProps = (dispatch) => ({
    fetchAuthSuccess: (id, token) => dispatch(fetchAuthSuccess(id, token))
});

export default connect(
    null,
    mapDispatchToProps,
)(AuthLoading);