import React from 'react';
import { createStackNavigator } from 'react-navigation';
import AuthLoadingContainer from "../containers/AuthLoadingContainer";

const AuthLoadingStack = createStackNavigator({
    AuthLoading: AuthLoadingContainer,
});

export default AuthLoadingStack;