import React from 'react';
import { createStackNavigator } from 'react-navigation';
import AuthScreen from "../screens/AuthScreen";

const AuthStack = createStackNavigator({
    Main: AuthScreen,
});

export default AuthStack;