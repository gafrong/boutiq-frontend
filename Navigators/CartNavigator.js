import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ShopCart from '../Screens/Cart/ShopCart';
import CheckoutNavigator from "./CheckoutNavigator";
import CompleteMessage from "../Screens/Cart/Checkout/CompleteMessage";
import Login from '../Screens/User/Login';
import Register from "../Screens/User/Register";
import UserProfile from "../Screens/User/UserProfile";

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='ShopCart'
                component={ShopCart}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='Checkout'
                component={CheckoutNavigator}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='CompleteMessage'
                component={CompleteMessage}
                options={{
                    title: "CompleteMessage",
                    headerShown: false
                }}
            />
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

export default function CartNavigator() {
    return <MyStack />
}