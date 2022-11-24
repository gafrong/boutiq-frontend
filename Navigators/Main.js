import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { BlurView } from 'expo-blur';


// Stacks
import ShopNavigator from "./ShopNavigator";
import CartNavigator from "./CartNavigator";
import UserNavigator from "./UserNavigator";
import AdminNavigator from "./AdminNavigator";
import VideoNavigator from "./VideoNavigator";

import CartIcon from "../Shared/CartIcon";
import AuthGlobal from "../Context/store/AuthGlobal";

const Tab = createBottomTabNavigator();

const Main = () => {

    const context = useContext(AuthGlobal)

    return (
        <Tab.Navigator 
            initialRouteName="Videos"
            screenOptions={{
                headerShown: false,
                keboardHidesTabBar: true,
                // showLabel: false,
                // activeTintColor: 'tomato',
                tabBarShowLabel: false,
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: '#ffffff',
                tabBarBackground: () => (
                    <BlurView tint="dark" intensity={80} style={{flex:1}}/>
                ),
                tabBarStyle:{
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    right: 0,
                    borderTopWidth: 0,
                    elevation: 0
                }
            }}
        >
           <Tab.Screen
                name="Videos"
                component={VideoNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon 
                            name="video"
                            style={{position: "relative"}}
                            color={color}
                            size={30}
                        />
                    )
                }}
           /> 
           <Tab.Screen
                name="Shop"
                component={ShopNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon 
                            name="shopping-bag"
                            style={{position: "relative"}}
                            color={color}
                            size={30}
                        />
                    )
                }}
           /> 
           <Tab.Screen 
                name="Cart"
                component={CartNavigator}
                options={{
                    tabBarIcon: ({color}) => (
                        <View>
                            <Icon 
                            name="shopping-cart"
                            color={color}
                            size={30}
                            />
                            <CartIcon />
                        </View>
                        
                    )
                }}
           />

           {context.stateUser.user.isAdmin == true ? (
            <Tab.Screen 
                name="Admin"
                component={AdminNavigator}
                options={{
                    tabBarIcon: ({color}) => (
                        <Icon 
                            name="settings"
                            color={color}
                            size={30}
                        />
                    )
                }}
            />
           ) : null }
           
           <Tab.Screen 
                name="User"
                component={UserNavigator}
                options={{
                    tabBarIcon: ({color}) => (
                        <Icon 
                            name="user"
                            color={color}
                            size={30}
                        />
                    )
                }}
           />           

        </Tab.Navigator>
    )
}


export default Main;