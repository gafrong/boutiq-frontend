import React, {useCallback, useState, useEffect} from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ActivityIndicator, FlatList, ScrollView } from "react-native";
import { Avatar, Button } from 'react-native-paper';
import Icon from "react-native-vector-icons/Feather";

import { useSelector } from "react-redux";

import ProductList from "../Market/ProductList";


const StoreProfilePage = (props) => {
    const [ loading, setLoading ] = useState(true);
    const vendor = useSelector((state) => state.vendors.vendor)
    const products = useSelector((state)=> state.stateProducts.products);

    const productCount = Object.keys(products).length;

    useEffect(() => {
        props.navigation.setOptions({
            title: vendor.brand
        });
        setLoading(false);
    }, [vendor.brand, props.navigation])

    return(
        <ScrollView style={styles.container}>        
            <View style={styles.profileContainer}>
                <Avatar.Image size={90} source={{url:vendor.image}} style={{marginRight:20, marginLeft: 10}} />
                <View style={styles.profileItemContainer}>
                    <View style={styles.profileItem}>
                        <Text style={styles.itemBold}>{vendor.followers.length}</Text>
                        <Text style={styles.profileItemText}>팔로워</Text>
                    </View>
                    <View style={styles.profileItem}>
                        <Text style={styles.itemBold}>{vendor.like ? vendor.like : 0}</Text>
                        <Text style={styles.profileItemText}>좋아요</Text>
                    </View>
                    <View style={styles.profileItem}>
                        <Text style={styles.itemBold}>{productCount}</Text>
                        <Text style={styles.profileItemText}>상품수</Text>
                    </View> 
                </View>     
            </View> 
            <View style={styles.profileDetail}>
                <Text style={{color:'#ffffff', marginBottom:5}}>{vendor.brand.toUpperCase()}</Text>
                <Text style={{color:'#ffffff'}}>{vendor.brandDescription}</Text>
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
            <View >
                {loading == false ? (
                    <View style={styles.storeProductsContainer}>
                        {products.map((item)=> 
                            <ProductList
                                navigation={props.navigation}
                                key={item._id}
                                item={item}
                                style={{width:'50%'}}
                            />)}
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
        </ScrollView>
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
        marginTop: 0,
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginTop: 10,
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