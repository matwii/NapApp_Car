import React from 'react';
import {
    AsyncStorage,
    Platform,
    View,
    ActivityIndicator,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import {MapView} from 'expo';
import {TaskManager} from 'expo';
import {Button, Text} from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';

const screen = Dimensions.get('window');

class MainScreen extends React.Component {

    /**
     * Runds methods after component has mounted.
     * @returns {Promise<void>}
     */
    async componentDidMount(){
        await this.props.setSocket(); //Starts the websocket to the server.
        this.props.startBackgroundFetch(); //Starts background location fetching and stores location to server.
        this.props.fetchRides(); //If the car has any booked rides, it fetches these and draws directions.
        this.props.navigation.setParams({ socket: this.props.socket, signOut: this.props.signOut}); //Adds the socket connection as param to the logout button in header.
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
                        await AsyncStorage.removeItem('id');
                        await TaskManager.unregisterTaskAsync('background-location-task');
                        await navigation.state.params.socket.disconnect();
                        await navigation.state.params.signOut();
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
            <View style={{flex: 1, alignItems: 'center'}}>
                {this.props.isLoading ?
                    <ActivityIndicator size="large" color="#0000ff" />
                    : <MapView
                        region={this.props.region}
                        style={{...StyleSheet.absoluteFillObject}}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: this.props.region.latitude,
                                longitude: this.props.region.longitude,
                            }}
                        >
                            <Ionicons name={Platform.OS === 'ios' ? 'ios-car' : 'md-car'} size={32} color="blue" />
                        </MapView.Marker>
                        {this.props.pickupCoordinates &&
                        <MapView.Marker
                            tracksViewChanges={false}
                            pinColor={'green'}
                            coordinate={this.props.pickupCoordinates}
                        />}
                        {this.props.destinationCoordinates &&
                        <MapView.Marker
                            coordinate={this.props.destinationCoordinates}
                        />}
                        <MapView.Polyline
                            coordinates={this.props.directions}
                            strokeWidth={2}
                            strokeColor="red"
                        />
                    </MapView>
                }
                {this.props.rides.map(ride => (
                    <View style={styles.overlay} key={ride.ride_id}>
                        {ride.ride_status = 1 ? <Text h4 style={styles.text}>Picking up {ride.name}</Text> : <Text>Driving {ride.name} to destination</Text>}
                    </View>
                ))}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: 'white',
        width: screen.width/1.2,
        height: screen.height/7,
        borderRadius: 10,
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
});


export default MainScreen;