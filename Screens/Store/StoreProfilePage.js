import React, {useCallback, useState} from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ActivityIndicator, FlatList } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { Avatar, Button } from 'react-native-paper';
import Icon from "react-native-vector-icons/Feather";

import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../Redux/state/authSlice";

import ProductList from "../Market/ProductList";
// import functions to access database
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';

var { width } = Dimensions.get('window');

const StoreProfilePage = (props) => {
    const storeProfile = props.route.params.videoProfile;
    // console.log('STORE PROFILE', props)
    const [ productsFiltered, setProductsFiltered ] = useState([]);
    const [ focus, setFocus] = useState();
    const [ categories, setCategories ] = useState([]);
    const [ productsCtg, setProductsCtg ] = useState([]);
    const [ active, setActive ] = useState();
    const [ initialState, setInitialState ] = useState([]);
    const [ loading, setLoading ] = useState(true);
  
    const dispatch = useDispatch();
    const products = useSelector((state)=> state.authReducer.products);
console.log('PRODUCT', products)

    const productCount = Object.keys(products).length;
console.log('PROD COUNT', productCount);
    const storeId = storeProfile.createdBy._id;
    console.log('store ID', storeId)
    useFocusEffect((
        useCallback(
            () => {
                setFocus(false);
                setActive(-1);
                // Products from database
                axios
                    .get(`${baseURL}products/admin/${storeId}`)
                    .then((res) => {
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

                }
            },
            [],
        )
    ))
    return(
        <View style={styles.container}>  
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Button
                    size={45}
                    style={styles.goBackBtn}>
                    <Icon 
                        name="chevron-left"
                        style={{}}
                        color={"#ffffff"}
                        size={32}
                    />
                </Button>
            </TouchableOpacity>
            <Text style={styles.storeHeader}>{storeProfile.createdBy.username}</Text>         
            <View style={styles.profileContainer}>
                <Avatar.Image size={90} source={'https://picsum.photos/700'} style={{marginRight:20, marginLeft: 10}} />
                <View style={styles.profileItemContainer}>
                    <View style={styles.profileItem}>
                        <Text style={styles.itemBold}>{storeProfile.followers}</Text>
                        <Text style={styles.profileItemText}>팔로워</Text>
                    </View>
                    <View style={styles.profileItem}>
                        <Text style={styles.itemBold}>{storeProfile.like}</Text>
                        <Text style={styles.profileItemText}>좋아요</Text>
                    </View>
                    <View style={styles.profileItem}>
                        <Text style={styles.itemBold}>{storeProfile.numViews}</Text>
                        <Text style={styles.profileItemText}>리뷰</Text>
                    </View> 
                </View>     
            </View> 
            <View style={styles.profileDetail}>
                <Text style={{color:'#ffffff', marginBottom:5}}>{storeProfile.brand.toUpperCase()}</Text>
                <Text style={{color:'#ffffff'}}>{storeProfile.description}</Text>
            </View> 
            <View style={styles.profileBtnContainer}>
                <Button style={styles.allBtn} 
                    contentStyle={{width:100}}
                    color="#333333"
                    mode="contained"
                    dark={true}
                    uppercase={false}
                    labelStyle={{fontSize:13}}
                    onPress={()=> alert('follow')}
                >
                    <Icon name="user-plus" size={18} color="white"/>
                </Button>
                <Button style={styles.allBtn} 
                    contentStyle={{width:100}}
                    color="#333333"
                    mode="contained"
                    dark={true}
                    uppercase={false}
                    labelStyle={{fontSize:13}}
                    onPress={()=> alert('follow')}
                >
                    <Icon name="heart" size={18} color="white"/>
                </Button>
                <Button style={styles.allBtn} 
                    contentStyle={{width:100}}
                    color="#333333"
                    mode="contained"
                    dark={true}
                    uppercase={false}
                    labelStyle={{fontSize:13}}
                    onPress={()=> alert('follow')}
                >
                    <Icon name="message-circle" size={18} color="white"/>
                </Button>
            </View>     
            <View style={styles.storeProductsContainer}>
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
                            style={{marginTop: 8}}
                        />
                    </View>
                ) : (
                    // Loading
                    <View style={styles.loadingContainer}>
                        <View>
                            <ActivityIndicator size="large" color="red" />
                            <Text>Something</Text>
                        </View>
                    </View>
                )}
            </View>         
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#000000",
        flexDirection:'column',
    },
    profileContainer:{
        flexDirection: 'row',
        paddingTop: 2,
        marginLeft: 10,
        marginTop: 15,
        marginRight: 10,
    },
    storeHeader: {
        position: 'relative',
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 33,
        paddingBottom: 4,
    },
    storeProductsContainer:{
        flex: 1,
    },
    profileBtnContainer:{
        flexDirection: 'row',
        height: 38,
        justifyContent: 'center',
        marginTop: 0,
        width: '100%',
        textAlign: 'center',
    },
    profileItemContainer:{
        flexDirection: 'row',
    },
    profileItem: {
        flexDirection: 'column',
        marginTop: 28,
        marginRight: 25,
        marginBottom: 12,
        marginLeft: 10,
        paddingRight: 0,
    },
    profileItemText:{
        color: '#ffffff',
    },
    profileDetail:{
        padding: 15,
    },  
    goBackBtn: {
        margin: 10,
        marginTop: 18,
        width: 30,
        height: 50,
        alignItems: 'center',
        position:'absolute'
    }, 
    itemBold:{
        fontSize:15,
        fontWeight: "bold",
        color: '#ffffff',
    },
    allBtn: {
        width: 100,
        marginRight: 15,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default StoreProfilePage;