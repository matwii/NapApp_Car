import React from 'react';
import { createStackNavigator } from 'react-navigation';
import AuthLoadingScreen from "../screens/AuthLoadingScreen";

const AuthLoadingStack = createStackNavigator({
    AuthLoading: AuthLoadingScreen,
});

export default AuthLoadingStack;