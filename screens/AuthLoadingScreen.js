import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage, Platform,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const token = await AsyncStorage.getItem('token');
        const id = await AsyncStorage.getItem('id');
        if (token){
            this.props.fetchAuthSuccess(parseInt(id), token);
        }

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(token ? 'App' : 'Auth');
    };

    // Render any loading content that you like here
    render() {
        return (
            <View>
                <ActivityIndicator />
                {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
            </View>
        );
    }
}

export default AuthLoadingScreen;