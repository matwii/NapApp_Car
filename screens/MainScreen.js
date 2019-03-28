import React from 'react';
import {
    Text,
    View,
} from 'react-native';

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        tabBarVisible: true
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