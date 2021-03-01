import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './../screens/HomeScreen';
import DetailsScreen from './../screens/DetailsScreen';
import JobPost from './../screens/JobPost';
import PostDetails from './../screens/PostDetails';

const Stack = createStackNavigator();

function StackNavigator(props) {
    return (
        // <NavigationContainer>
        <Stack.Navigator >
            <Stack.Screen name="HomeScreen" component={HomeScreen}
                options={{
                    header: () => null,
                }} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="JobPost" component={JobPost} />
            <Stack.Screen name="Post Details" component={PostDetails} />
        </Stack.Navigator>
        // </NavigationContainer>
    );
}

export default StackNavigator;