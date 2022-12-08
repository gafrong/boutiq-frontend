import React from "react";
import {View, StyleSheet } from 'react-native';
import StoreProductCard from "./StoreProductCard";

const StoreProductList = ({navigation, item}) => {
    return (
        <View style={{flexDirection: 'row'}}>
            <StoreProductCard item={item} navigation={navigation}/>
        </View>
    )
}

export default StoreProductList;