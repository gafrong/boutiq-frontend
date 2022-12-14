import React, {useState, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator, FlatList, Dimensions, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Text } from 'react-native-paper';

// import functions to access database
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';

import SearchArea from "./SearchArea";
import ProductList from './ProductList';

import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../Redux/state/authSlice";

var { width, height } = Dimensions.get('window');

const ProductContainer = (props) => {

    const [ productsFiltered, setProductsFiltered ] = useState([]);
    const [ focus, setFocus] = useState();
    const [ categories, setCategories ] = useState([]);
    const [ productsCtg, setProductsCtg ] = useState([]);
    const [ active, setActive ] = useState();
    const [ initialState, setInitialState ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const dispatch = useDispatch();
    const products = useSelector((state)=> state.authReducer.products);
 
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
                        // setProducts(res.data);
                        // setProductsFiltered(res.data);
                        // setProductsCtg(res.data);
                        // setInitialState(res.data);
                        dispatch(setProducts({products:res.data}))
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
                    // setProducts([])
                    // setProductsFiltered([])
                    // setFocus()
                    // setCategories([])
                    // setActive()
                    // setInitialState()
                }
            },
            [],
        )
    ))

    return(
        <>           
            {loading == false ? (
                <View style={[styles.container,{width:width}]}>
                    
                    <Text 
                        style={[{color:"#ffffff"}, {padding:10}]}
                        variant="titleLarge"></Text>
                        <SearchArea />
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
                        style={{marginTop: 8}}
                    />
                </View>
            ) : (
                // Loading
                <View style={styles.loadingContainer}>
                    <View>
                        <ActivityIndicator size="large" color="red" />
                    </View>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexWrap: "wrap",
        backgroundColor: "#222222"
    },
    loadingContainer:{
        flex:1,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor:'#222222',
    }
  });

export default ProductContainer;