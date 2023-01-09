import React, { useState, useCallback, useContext, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage"
import baseURL from "../../assets/common/baseUrl";
import AuthGlobal from "../../Context/store/AuthGlobal";
import { useFocusEffect } from '@react-navigation/native';

import OrderCard from '../../Shared/OrderCard';

const Orders = (props) => {
    const [ orderList, setOrderList ] = useState();
    const context = useContext(AuthGlobal);


    useFocusEffect(
        useCallback(() =>{     
            AsyncStorage.getItem("jwt")
            .then((res) => {
                axios
                    .get(`${baseURL}orders`, {
                        headers: {'Authorization': `Bearer ${res}`}
                    })
                    .then((x) => setOrderList(x.data))
            })
            .catch((error) => console.log(error))            
        }, [])
    )
    
    return(
        <View>
            <FlatList 
                data={orderList}
                renderItem={({item}) => (
                    // set editMode true to shoe the edit buttons in the orderCard
                    <OrderCard navigation={props.navigation} {...item} editMode={true}/>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default Orders;