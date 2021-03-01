import * as React from 'react';
import { Icon, Button } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './../screens/HomeScreen';
import ProfileScreen from './../screens/ProfileScreen';
import AboutScreen from './../screens/AboutScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './../screens/LoginScreen';
import MyCV from './../screens/MyCV';
import { connect } from 'react-redux';
import StackNavigator from './StackNavigator';

const Drawer = createDrawerNavigator();

function Routing(props) {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerStyle={{
                    paddingTop: 200
                    // backgroundColor: '#c6cbef',
                    // width: 240,
                }}>
                <Drawer.Screen name="HomeScreen" component={StackNavigator} />
                {props.user.role === 'student' && <Drawer.Screen name="My CV" component={MyCV} />}
                <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
                <Drawer.Screen name="AboutScreen" component={AboutScreen} />
                <Drawer.Screen name="Logout" component={LoginScreen} initialParams={{ params: { params: { logout: true, userEmail: '' } } }} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

function mapStateToProp(state) {
    return ({
        user: { ...state.root.user },
    })
}

export default connect(mapStateToProp)(Routing);