import React from 'react';
import {
    Text,
    View,
    AsyncStorage
} from 'react-native';
import { Button } from 'react-native-elements'

class MainScreen extends React.Component {

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
                <Text>
                    MainScreen
                </Text>
            </View>
        );
    }
}

export default MainScreen;