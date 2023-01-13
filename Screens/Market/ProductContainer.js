import React, {useState, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator, FlatList, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

// import functions to access database
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';

import ProductList from './ProductList';

import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../Redux/Reducers/productSlice";

var { width } = Dimensions.get('window');

const ProductContainer = (props) => {

    const [ productsFiltered, setProductsFiltered ] = useState([]);
    const [ focus, setFocus] = useState();
    const [ categories, setCategories ] = useState([]);
    const [ productsCtg, setProductsCtg ] = useState([]);
    const [ active, setActive ] = useState();
    const [ initialState, setInitialState ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const dispatch = useDispatch();
    const products = useSelector((state)=> state.stateProducts.products);
    const productCount = Object.keys(products).length;

    const navigation = useNavigation();

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
        <View style={styles.pageContainer}>           
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>VOUTIQ</Text>
                <TouchableOpacity 
                    onPress={()=> navigation.navigate('SearchArea')}
                    style={styles.search}>
                    <Icon 
                        name="search"
                        style={styles.searchIcon}
                        color={'#fff'}
                        size={20}
                    />
                </TouchableOpacity>
                
            </View>
            <ScrollView>
                <View style={styles.categoryArea}>

                </View>
                {loading == false ? (
                    <View style={[styles.container,{width:width}]}>            

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
                            style={{marginTop: 0}}
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
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#222'
    },
    container: {
        flex:1,
        flexWrap: "wrap",
        backgroundColor: "#222222"
    },
    headerContainer:{
        height: 65,
        paddingLeft: 15,
        padding: 10,
        paddingTop: 30,
        backgroundColor: '#000',
        flexDirection: 'row'
    },
    headerTitle: {
        color: '#fff',
        fontSize: 22,
        paddingTop: 2
    },
    headerText: {
        color: '#fff'
    },
    categoryArea: {
        height: 40,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#222',
    },
    search : {
        color: '#fff',
        position: 'absolute',
        right: 15,
        top: 35
    },
    loadingContainer:{
        flex:1,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor:'#222222',
    }
  });

export default ProductContainer;