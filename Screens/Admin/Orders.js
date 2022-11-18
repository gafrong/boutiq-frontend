import React, { useState, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import { useFocusEffect } from '@react-navigation/native';

const Orders = (props) => {
    return(
        <View>
            <Text>Orders Screen</Text>
        </View>
    )
}

export default Orders;