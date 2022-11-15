import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ShopCart from '../Screens/Cart/ShopCart';
import CheckoutNavigator from "./CheckoutNavigator";
import CompleteMessage from "../Screens/Cart/Checkout/CompleteMessage";

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
        </Stack.Navigator>
    )
}

export default function CartNavigator() {
    return <MyStack />
}