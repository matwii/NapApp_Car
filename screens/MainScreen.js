import React from 'react';
import {
    Text,
    View,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import { Location, TaskManager, Permissions } from 'expo';
import { Button } from 'react-native-elements'

const LOCATION_TASK_NAME = 'background-location-task';

class MainScreen extends React.Component {


    onPress = async () => {
        const { Location, Permissions } = Expo;
        // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
        const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            return await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
                accuracy: Location.Accuracy.High,
            });
        } else {
            throw new Error('Location permission not granted');
        }

    };

    /**
     * Adds button to the header for signing out the user.
     * Signs out the user by first removing token from AsyncStorage then navigating back to AuthScreen
     * @param navigation
     * @returns {{tabBarVisible: boolean, headerRight: *}}
     */
    static navigationOptions = ({navigation}) => {
        return {
            tabBarVisible: true,
            headerRight: (
                <Button
                    onPress={async() => {
                        await AsyncStorage.removeItem('token');
                        await TaskManager.unregisterTaskAsync(LOCATION_TASK_NAME)
                        navigation.navigate('Auth')
                    }}
                    title='Sign Out'
                    buttonStyle={{backgroundColor: "transparent", elevation: 0}}
                    titleStyle={{fontWeight: "bold", color: 'black'}}
                />
            ),
        }
    };

    render() {
        return (
            <View>
                <Text>MainScreen</Text>
                <TouchableOpacity onPress={this.onPress}>
                    <Text>Enable background location</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
        // Error occurred - check `error.message` for more details.
        return;
    }
    if (data) {
        const { locations } = data;
        console.log('FETCH: ' + locations);
        // do something with the locations captured in the background
    }
});

export default MainScreen;