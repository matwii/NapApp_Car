import { connect } from 'react-redux';
import AuthLoadingScreen from '../screens/AuthScreen';
import { signIn } from '../actions/auth-actions';


const mapDispatchToProps = (dispatch) => ({
    signIn: (regNr) => dispatch(signIn(regNr))
});

export default connect(
    null,
    mapDispatchToProps,
)(AuthLoadingScreen);