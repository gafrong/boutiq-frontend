import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from '@react-navigation/native';

import ProductContainer from "../Screens/Market/ProductContainer";
import SingleProduct from "../Screens/Market/SingleProduct";
import SearchArea from "../Shared/SearchArea";

const Stack = createStackNavigator()

function MyStack() {
    const navigation = useNavigation();

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
                    headerShadowVisible: false,
                    headerBackTitleVisible: false
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
            <Stack.Screen 
                name='SearchArea'
                component={SearchArea}
                options={{
                    headerShown:false,
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