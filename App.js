import React from 'react';
import {Platform, StatusBar, StyleSheet, View, UIManager, AsyncStorage} from 'react-native';
import {AppLoading, Asset, Font, Icon, TaskManager} from 'expo';
import AppNavigator from './navigation/AppNavigator';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {fetchLocationError, updateCarPosition} from "./actions/background-actions";
const LOCATION_TASK_NAME = 'background-location-task';


// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

const store = configureStore({});

export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
    };

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                <Provider store={store}>
                    <View style={styles.container}>
                        {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                        <AppNavigator/>
                    </View>
                </Provider>
            );
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require('./assets/images/robot-dev.png'),
                require('./assets/images/robot-prod.png'),
                require('./assets/images/bg-image.jpg')
    ]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                ...Icon.Ionicons.font,
                // We include SpaceMono because we use it in AuthScreen.js. Feel free
                // to remove this if you are not using it in your app
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
            }),
        ]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = async () => {
        await this.setState({isLoadingComplete: true});
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

TaskManager.defineTask(LOCATION_TASK_NAME, ({data, error}) => {
    if (error) {
        // Error occurred - check `error.message` for more details.
        store.dispatch(fetchLocationError())
    }
    if (data) {
        let {locations} = data;
        // do something with the locations captured in the background
        if (!locations[0].coords.latitudeDelta) {
            locations = {
                latitude: locations[0].coords.latitude,
                longitude: locations[0].coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }
        }
        const { carId, token } = store.getState().auth;
        token && store.dispatch(updateCarPosition(locations, carId, token))
    }
});
