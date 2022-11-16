import React, {useState, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator, FlatList, Dimensions, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// import functions to access database
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';

import ProductList from './ProductList'

const data = require('../../assets/data/product.json')

var { width, height } = Dimensions.get('window');

const ProductContainer = (props) => {

    const [ products, setProducts ] = useState([]);
    const [ productsFiltered, setProductsFiltered ] = useState([]);
    const [ focus, setFocus] = useState();
    const [ categories, setCategories ] = useState([]);
    const [ productsCtg, setProductsCtg ] = useState([]);
    const [ active, setActive ] = useState();
    const [ initialState, setInitialState ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    // react navigation when in focus a screen will use callback. useful when we have several products in the same navigation, so that when we come back, there will be a callback for data changes
    useFocusEffect((
        useCallback(
            () => {
                setFocus(false);
                setActive(-1);
                // Products from database
                axios
                    .get(`${baseURL}products`)
                    .then((res) => {
                        setProducts(res.data);
                        setProductsFiltered(res.data);
                        setProductsCtg(res.data);
                        setInitialState(res.data);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.log('Server error msg',error.message)
                    })
                // Categories from database
                axios
                    .get(`${baseURL}categories`)
                    .then((res) => {
                        setCategories(res.data)
                    })
                    .catch((error) => {
                        alert(error.message)
                    })
        
                return () => {
                    setProducts([])
                    setProductsFiltered([])
                    setFocus()
                    setCategories([])
                    setActive()
                    setInitialState()
                }
            },
            [],
        )
    ))

    return(
        <>
            {loading == false ? (
                <View style={{width:width}}>
                    <Text>Hello</Text>
                    <View style={{marginTop: 10}}>
                        <FlatList
                            numColumns={2}
                            data={products}
                            renderItem={({item}) => 
                            <ProductList
                                navigation={props.navigation}
                                key={item._id}
                                item={item}
                            />}
                            keyExtractor={item => item.name}
                        />
                    </View>
                </View>
            ) : (
                // Loading
                <View style={[styles.center, {backgroundColor: '#f2f2f2'}]}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flexWrap: "wrap",
      backgroundColor: "gainsboro",
    },
    listContainer: {
      height: height,
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-start",
      flexWrap: "wrap",
      backgroundColor: "gainsboro",
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
  });

export default ProductContainer;