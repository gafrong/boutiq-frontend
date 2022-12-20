import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProductContainer from "../Screens/Market/ProductContainer";
import SingleProduct from "../Screens/Market/SingleProduct";

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator 
            screenOptions={{
                headerTrasparent: true,
                headerStyle:{backgroundColor: '#000'},
                headerTintColor: '#fff'
            }}>  
            <Stack.Screen 
                name='Homee'
                component={ProductContainer}
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name='ProductDetail'
                component={SingleProduct}
                options={{
                    headerShown:true,
                    headerShadowVisible: false,
                    headerBackTitleVisible: false
                }}
            />
        </Stack.Navigator>
    )
}

export default function MarketNavigator() {
    return <MyStack />
}