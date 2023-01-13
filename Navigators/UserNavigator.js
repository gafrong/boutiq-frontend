import React, { useContext }  from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../Screens/User/Login';
import Register from '../Screens/User/Register';
import UserProfile from '../Screens/User/UserProfile';
import AuthGlobal from '../Context/store/AuthGlobal';
import UserSetting from '../Screens/User/UserSetting';

const Stack = createStackNavigator();

const UserNavigator =  () => {
    const context = useContext(AuthGlobal);
    const isAuthenticated = context.stateUser.isAuthenticated;
    const user = context.stateUser.userProfile;

    return(
        <>
        {!isAuthenticated
        ?
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
        :   
            <Stack.Navigator 
                screenOptions={{
                    headerTrasparent: true,
                    headerStyle:{backgroundColor: '#222'},
                    headerTintColor: '#fff'
                }}>  
                <Stack.Screen
                    name={`@${user.username}`}
                    component={UserProfile}
                    options={{
                        headerShown:false,
                        headerShadowVisible: false,
                        headerBackTitleVisible: false,
                        headerTitleStyle: {
                            fontSize: 22
                        } 
                    }}
                />
                <Stack.Screen
                    name="UserSetting"
                    component={UserSetting}
                    options={{
                        headerShown: true,
                        headerShadowVisible: false,
                        headerBackTitleVisible: false,
                    }}
                />
            </Stack.Navigator>
        }
        </>
    )
}

export default UserNavigator;