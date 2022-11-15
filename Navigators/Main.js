import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

// Stacks
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
// import UserNavigator from "./UserNavigator";
// import AdminNavigator from "./AdminNavigator";

import CartIcon from "../Shared/CartIcon";
// import AuthGlobal from "../Context/store/AuthGlobal";

const Tab = createBottomTabNavigator();

const Main = () => {

    // const context = useContext(AuthGlobal)

    return (
        <Tab.Navigator 
            initialRouteName="Home"
            screenOptions={{
                keboardHidesTabBar: true,
                showLabel: false,
                activeTintColor: '#e91e63'
            }}
        >
           <Tab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon 
                            name="home"
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

            <Tab.Screen 
                name="Admin"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({color}) => (
                        <Icon 
                            name="cog"
                            color={color}
                            size={30}
                        />
                    )
                }}
            />

           <Tab.Screen 
                name="User"
                component={HomeNavigator}
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