import React, { useContext, useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OrderCard from '../../Shared/OrderCard';
import { Avatar } from 'react-native-paper';
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

import AuthGlobal from '../../Context/store/AuthGlobal';
import { logoutUser } from '../../Context/actions/Auth.actions';

var { width } = Dimensions.get("window");

const UserProfile = (props) => {
    const context = useContext(AuthGlobal)
    const user = context.stateUser.userProfile;
    console.log('PROFILE', user)
    const [userProfile, setUserProfile] = useState()
    const [orders, setOrders] = useState()
    const navigation = useNavigation();
    
    useFocusEffect(
        useCallback(() => {
        if(
            context.stateUser.isAuthenticated === false ||
            context.stateUser.isAuthenticated === null
        ) {
            props.navigation.navigate("Login")
        }

        AsyncStorage.getItem("jwt")
            .then((res) => {
                axios
                    .get(`${baseURL}users/${context.stateUser.user.userId}`, {
                        headers: { 'Authorization': `Bearer ${res}`},
                    })
                    .then((user) => setUserProfile(user.data))
                    .then(
                        axios
                        .get(`${baseURL}orders`, {
                            headers: {'Authorization': `Bearer ${res}`}
                        })
                        .then((x) => {
                            const data = x.data;
                            const userOrders = data.filter(
                                (order) => order.user._id === context.stateUser.user.userId
                            );
                            setOrders(userOrders);
                        })
                        .catch((error) => console.log(error))
                    )
            })
            .catch((error) => console.log('Whatch this error', error.response.data))

        return () => {
            setUserProfile();
            setOrders();
        }    


    }, [context.stateUser.isAuthenticated]))

    return(
        <View style={styles.container}>  
            <View style={styles.profileMenu}>
                <Text style={{fontSize:20, color: '#fff', paddingTop: 8}}>
                    @{userProfile ? userProfile.username : ""}
                </Text>
                <View style={{marginTop:2, position: 'absolute', right: 5, top: 26}}>
                    <Button 
                        mode="text" 
                        onPress={() => {
                            navigation.navigate('UserSetting', {user:context})
                        }}>
                        <Icon
                            name="settings" 
                            size={19} 
                            color="#fff"/>
                    </Button>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.subContainer}>
                <View style={styles.profileArea}>
                    { user.image ?
                        <Avatar.Image size={80} source={{url:user.image}} style={{marginRight:20, marginLeft: 10}} />
                    :   
                        <Avatar.Image size={80} source={{url:"https://picsum.photos/700"}} style={{marginRight:20, marginLeft: 10}} />
                    }
                    
                    <View>
                        
                        <View style={{marginTop:20}}>
                            <Text style={{color: '#fff'}}>
                                Email: {userProfile ? userProfile.email : ""}
                            </Text>
                            <Text style={{marginTop:10, color: '#fff'}}>
                                Phone: {userProfile ? userProfile.phone : ""}
                            </Text>
                        </View>
                    </View>
                </View>
                
                {/* <View style={{marginTop:0}}>
                    <Button title={"Sign Out"} onPress={() => {
                        AsyncStorage.removeItem("jwt"),
                        logoutUser(context.dispatch)
                    }}/>
                </View> */}
                <View style={styles.order}>
                    <Text style={{fontSize: 20, color: '#fff'}}>My Orders</Text>
                    <View>
                        {orders ? (
                            orders.map((x) => {
                                return <OrderCard key={x.id} {...x} />;
                            })
                        ) : (
                            <View style={styles.order}>
                                <Text>You have no orders</Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#000'
    },
    subContainer: {
        alignItems: "center",
        paddingTop: 10,
        backgroundColor: '#222',
        color: '#fff'
    },
    order: {
        marginTop: 20,
        alignItems: "center",
        marginBottom: 60
    },
    profileArea: {
        width: width,
        padding: 15,
        flexDirection: 'row'
    },
    profileMenu : {
        height: 70,
        backgroundColor: '#000',
        flexDirection: 'row',
        paddingTop:24, 
        paddingLeft: 10
    }
})


export default UserProfile;