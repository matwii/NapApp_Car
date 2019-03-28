import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthStack from "./AuthStack";
import AuthLoadingStack from "./AuthLoadingStack";


export default createAppContainer(createSwitchNavigator({
        // You could add another route here for authentication.
        // Read more at https://reactnavigation.org/docs/en/auth-flow.html
        AuthLoading: AuthLoadingStack,
        Auth: AuthStack,
        App: MainTabNavigator,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));