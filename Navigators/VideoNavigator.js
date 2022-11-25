import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import VideoContainer from "../Screens/Video/VideoContainer";
import ProductContainer from "../Screens/Products/ProductContainer";
import SingleProduct from "../Screens/Products/SingleProduct";
import StoreContainer from "../Screens/Store/StoreContainer";

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator screenOptions={{headerTrasparent: true}}>
            <Stack.Screen 
                name='Video'
                component={VideoContainer}
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name='Store'
                component={StoreContainer}
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name='ProductDetail'
                component={SingleProduct}
                options={{
                    headerShown:false,
                }}
            />
        </Stack.Navigator>
    )
}

export default function VideoNavigator() {
    return <MyStack />
}