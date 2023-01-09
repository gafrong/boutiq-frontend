import React, { useContext }  from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../Screens/User/Login';
import Register from '../Screens/User/Register';
import UserProfile from '../Screens/User/UserProfile';
import AuthGlobal from '../Context/store/AuthGlobal';

const Stack = createStackNavigator();

const UserNavigator =  () => {
    const context = useContext(AuthGlobal);
    const isAuthenticated = context.stateUser.isAuthenticated;

    return(
        <Stack.Navigator screenOptions={{headerTrasparent: true}}>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="UserProfile"
                component={UserProfile}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default UserNavigator;