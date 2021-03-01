import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './../screens/HomeScreen';
import DetailsScreen from './../screens/DetailsScreen';

const Stack = createStackNavigator();

function StackNavigator(props) {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                {/* <Stack.Screen name="HomeScreen" component={HomeScreen} 
                options={{
                    header: () => null,
                  }}/> */}
                <Stack.Screen name="Details" component={DetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackNavigator;