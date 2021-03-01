// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './../screens/SignupScreen';
import LoginScreen from './../screens/LoginScreen';

const Stack = createStackNavigator();

function StartRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        header: () => null,
      }}>
        <Stack.Screen name="Signin" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StartRouter;