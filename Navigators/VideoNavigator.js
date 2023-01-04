import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import VideoContainer from "../Screens/Video/VideoContainer";
import StoreContainer from "../Screens/Store/StoreContainer";
import StoreProfilePage from "../Screens/Store/StoreProfilePage";
import StoreSingleProduct from "../Screens/Store/StoreSingleProduct";
import BookmarkedVideos from "../Screens/Video/BookmarkedVideos";

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator 
            screenOptions={{
                headerTrasparent: true,
                headerStyle:{backgroundColor: '#000'},
                headerTintColor: '#fff'
            }}>   
            <Stack.Group>
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
                        headerShown:true,
                        headerShadowVisible: false,
                        headerBackTitleVisible: false
                    }}
                />
                <Stack.Screen 
                    name='StoreProductDetail'
                    component={StoreSingleProduct}
                    options={{
                        headerShown:true,
                        headerShadowVisible: false,
                        headerBackTitleVisible: false
                    }}
                />
                <Stack.Screen 
                    name='StoreProfilePage'
                    component={StoreProfilePage}
                    options={{
                        headerShown:true,
                        headerShadowVisible: false,
                        headerBackTitleVisible: false
                    }}
                />
                <Stack.Screen 
                    name='ProductDetail'
                    component={StoreSingleProduct}
                    options={{
                        headerShown:true,
                        headerShadowVisible: false,
                        headerBackTitleVisible: false
                    }}
                />
                <Stack.Screen 
                    name='BookmarkedVideos'
                    component={BookmarkedVideos}
                    options={{
                        headerShown: false,
                        headerShadowVisible: false,
                        headerBackTitleVisible: false
                    }}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default function VideoNavigator() {
    return <MyStack />
}