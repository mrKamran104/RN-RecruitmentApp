// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './../screens/LoginScreen';
import Student from './../screens/StudentSignup';
import Company from './../screens/CompanySignup';

const Stack = createStackNavigator();

function StartRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        header: () => null,
      }}>
        <Stack.Screen name="Signin" component={LoginScreen} />
        <Stack.Screen name="Student" component={Student} />
        <Stack.Screen name="Company" component={Company} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StartRouter;