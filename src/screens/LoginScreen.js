import {
    Button, Form, Icon,
    Input, Item,
    Label
} from 'native-base';
import React, { useState, useEffect } from 'react';
import {
    Alert, Dimensions,
    ImageBackground, ScrollView, StyleSheet, Text, View
} from 'react-native';
import { connect } from 'react-redux';
import { Disable, SigninUser, Logout } from '../store/actions';

const image = { uri: 'https://reactjs.org/logo-og.png' };
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

function LoginScreen(props) {
    const { navigation, route } = props;

    useEffect(() => {
        if (route.params != undefined && route.params.params.logout) {
            props.Logout(false)
        }
        props.Disable(false);
    }, [])

    // const [login, setLogin] = useState(false)
    const [userEmail, setUserEmail] = useState('');
    const [userPass, setUserPass] = useState('');
    const [hidePass, setHidePass] = useState(true);
    // const [disable, setDisable] = useState(false)

    if (
        route.params != undefined &&
        userEmail !== route.params.params.userEmail
    ) {
        setUserEmail(route.params.params.userEmail);
    }

    const signinwithEmail = async () => {
        if (userEmail === '' || userPass === '') {
            // setError('Fields are required');
            createTwoButtonAlert('Error!!!', 'All Fields are required', () =>
                console.log('OK Pressed'),
            );
            return;
        }
        props.Disable(true);
        props.SigninUser({ login: true, email: userEmail, password: userPass });
        // setDisable(true)
    };

    // const signupwithEmail = () => {
    //   // props.Login(true);
    //   console.log("Signup Email")
    // };
    const signinwithgmail = () => {
        // props.Login(true);
        console.log('Gmail');
    };
    const signinwithfb = () => {
        // props.Login(true);
        console.log('facebook');
    };

    // const toggleSwitch = () =>{
    //   // setPass( { showPassword: !this.state.showPassword });
    // }

    const createTwoButtonAlert = (title, msg, func) =>
        Alert.alert(
            title,
            msg,
            [
                ,
                // {
                //   text: "Cancel",
                //   onPress: () => console.log("Cancel Pressed"),
                //   style: "cancel"
                // },
                { text: 'OK', onPress: func },
            ],
            { cancelable: false },
        );
    // console.log(props.login, userEmail, userPass);
    return (
        <ScrollView
            style={{
                flex: 1,
                // justifyContent: 'center',
                // alignItems: 'center',
                // backgroundColor: '#c1cdd0',
                backgroundColor: 'black',
            }}>
            <View style={styles.ImageBg}>
                <ImageBackground source={image} style={styles.image}>
                    <Text style={styles.text}>Login Screen</Text>
                </ImageBackground>
            </View>

            {/* <View> */}
            <View style={styles.container}>
                <Form>
                    <Item floatingLabel style={{ marginEnd: 20 }}>
                        <Label>Email</Label>
                        <Input
                            value={userEmail}
                            onChangeText={(val) => setUserEmail(val)}
                        />
                    </Item>
                    {/* <View> */}
                    <Item floatingLabel style={{ marginEnd: 20 }}>
                        <Label>Password</Label>
                        <Input
                            value={userPass}
                            onChangeText={(val) => setUserPass(val)}
                            secureTextEntry={hidePass ? true : false}
                        />
                        <Icon type="FontAwesome"
                            name={hidePass ? 'eye-slash' : 'eye'}
                            size={15}
                            color="grey"
                            onPress={() => setHidePass(!hidePass)}
                        />
                    </Item>
                    {/* </View> */}
                    <Button
                        style={{
                            marginTop: 50,
                            marginEnd: 30,
                            marginStart: 30,
                            backgroundColor: !props.disable ? 'green' : 'grey',
                        }}
                        onPress={signinwithEmail}
                        iconLeft
                        block
                        disabled={props.disable ? true : false}>
                        {/* <Icon name='home' /> */}
                        <Text style={{ color: 'white' }}>Signin with Email</Text>
                    </Button>
                    {/* {error && (
              <Alert severity="error" onClick={() => setError(null)}>
                {error}
                </Alert>
              )} */}

                    {/* <Button style={{marginTop: 50}} onPress={() => props.Login(true)} title="Login" /> */}
                </Form>
                <Text
                    style={{
                        marginTop: 28,
                        marginBottom: 30,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 20,
                    }}>
                    - OR -
          </Text>
                <View style={{ paddingBottom: 50 }}>
                    <Button
                        style={{ marginEnd: 30, marginStart: 30 }}
                        onPress={() => navigation.navigate('Signup')}
                        iconLeft
                        block
                        disabled={props.disable ? true : false}>
                        {/* <Icon name='home' /> */}
                        <Text style={{ color: 'white' }}>Signup with Email</Text>
                    </Button>
                    <Button
                        style={{
                            marginTop: 20,
                            marginEnd: 30,
                            marginStart: 30,
                            // backgroundColor: 'red',
                        }}
                        onPress={signinwithgmail}
                        iconLeft
                        block
                        disabled>
                        {/* <Icon name='home' /> */}
                        <Text style={{ color: 'white' }}>Signin with Gmail</Text>
                    </Button>
                    <Button
                        style={{ marginTop: 20, marginEnd: 30, marginStart: 30 }}
                        onPress={signinwithfb}
                        iconLeft
                        block
                        disabled>
                        {/* <Icon name='home' /> */}
                        <Text style={{ color: 'white' }}>Signin with Facebook</Text>
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        // bottom: 50,
        // bottom: 0,
        // flex: 0.3,
        backgroundColor: 'white',
        // position: 'absolute',
        // zIndex: 2,
        // left: 0,
        paddingTop: 20,
        // borderWidth: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    boder: {
        borderTopRightRadius: 80,
        borderWidth: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    image: {
        // flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 42,
        paddingTop: 120,
        paddingBottom: 120,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000a0',
    },
    ImageBg: {
        flex: 1,
        // height: 50,
        flexDirection: 'column',
    },
    contentContainer: {
        backgroundColor: '#f6f6f6',
        flex: 1,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },
    searchContainer: {
        padding: 32,
    },
});

function mapStateToProp(state) {
    return {
        login: state.root.login,
        disable: state.root.disable,
        msg: state.root.msg,
    };
}
function mapDispatchToProp(dispatch) {
    return {
        SigninUser: (data) => {
            dispatch(SigninUser(data));
        },
        Disable: (data) => {
            dispatch(Disable(data));
        },
        Logout: (data) => { dispatch(Logout(data)) }
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(LoginScreen);
