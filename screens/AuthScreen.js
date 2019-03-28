import React from 'react';
import {
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    Dimensions,
    ImageBackground,
    View,
    LayoutAnimation,
    AsyncStorage
} from 'react-native';

import api from '../services/api';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BG_IMAGE = require('../assets/images/bg-image.jpg');

export default class AuthScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fontLoaded: false,
            regNr: '',
            isLoading: false,
            errorMessage: ''
        }
    }

    static navigationOptions = {
        header: null,
    };

    login = async (regNr) => {
        const response = await api.login(regNr);
        if (response.error){
            return this.setState({errorMessage: response.error})
        }
        await AsyncStorage.setItem('token', response.data.token);
        this.props.navigation.navigate('App');
    };

    render() {
        const {
            regNr,
            isLoading,
            errorMessage
        } = this.state;
        LayoutAnimation.easeInEaseOut();
        return (
            <View style={styles.container}>
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <View>
                        <KeyboardAvoidingView
                            contentContainerStyle={styles.loginContainer}
                            behavior="position"
                        >
                            <View style={styles.titleContainer}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.titleText}>NAP</Text>
                                </View>
                                <View style={{ marginTop: -10, marginLeft: 10 }}>
                                    <Text style={styles.titleText}>APP</Text>
                                </View>
                            </View>
                            <View style={styles.formContainer}>
                                <Input
                                    leftIcon={
                                        <Icon
                                            name="car"
                                            color="rgba(0, 0, 0, 0.38)"
                                            size={25}
                                            style={{ backgroundColor: 'transparent' }}
                                        />
                                    }
                                    value={regNr}
                                    keyboardAppearance="light"
                                    autoFocus={false}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType="next"
                                    inputStyle={{ marginLeft: 10 }}
                                    placeholder={'Registraion number'}
                                    containerStyle={{
                                        borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                    }}
                                    onSubmitEditing={() => this.login(regNr)}
                                    onChangeText={regNr => this.setState({ regNr })}
                                    errorMessage={errorMessage ? errorMessage : ''}
                                />
                                <Button
                                    buttonStyle={styles.loginButton}
                                    containerStyle={{ marginTop: 32, flex: 0 }}
                                    activeOpacity={0.8}
                                    title={'LOGIN'}
                                    onPress={() => this.login(regNr)}
                                    titleStyle={styles.loginTextButton}
                                    loading={isLoading}
                                    disabled={isLoading}
                                />
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </ImageBackground>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer: {
        height: 150,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    titleText: {
        color: 'white',
        fontSize: 50,
        textShadowColor:'#585858',
        textShadowOffset:{width: 1, height: 1},
        textShadowRadius:5,
    },
    formContainer: {
        backgroundColor: 'white',
        width: SCREEN_WIDTH - 30,
        borderRadius: 10,
        paddingTop: 32,
        paddingBottom: 32,
        alignItems: 'center',
    },
    loginTextButton: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    loginButton: {
        backgroundColor: 'rgba(232, 147, 142, 1)',
        borderRadius: 10,
        height: 50,
        width: 200,
    },
});
