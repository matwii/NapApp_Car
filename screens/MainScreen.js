import React from 'react';
import {
    AsyncStorage,
    Platform,
    View,
    ActivityIndicator
} from 'react-native';
import {MapView} from 'expo';
import {TaskManager} from 'expo';
import {Button} from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';

class MainScreen extends React.Component {

    componentDidMount(){
        this.props.startBackgroundFetch();
    }
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
                    onPress={async () => {
                        await AsyncStorage.removeItem('token');
                        await TaskManager.unregisterTaskAsync('background-location-task');
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
            <View style={{flex: 1}}>
                {this.props.isLoading ?
                    <ActivityIndicator size="large" color="#0000ff" />
                    : <MapView
                        region={this.props.region}
                        onRegionChange={region => console.log(region)}
                        style={{flex: 1}}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: this.props.region.latitude,
                                longitude: this.props.region.longitude,
                            }}
                        >
                            <Ionicons name={Platform.OS === 'ios' ? 'ios-car' : 'md-car'} size={32} color="blue" />
                        </MapView.Marker>
                    </MapView>
                }
            </View>
        );
    }
}

export default MainScreen;