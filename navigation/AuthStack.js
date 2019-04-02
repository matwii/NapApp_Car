import React from 'react';
import { createStackNavigator } from 'react-navigation';
import AuthContainer from "../containers/AuthContainer";

const AuthStack = createStackNavigator({
    Auth: AuthContainer,
});

export default AuthStack;