import React, {useState, useEffect, useContext} from "react";
import { StyleSheet, View, Text, ActivityIndicator, FlatList, ScrollView, Dimensions } from "react-native";
import { Avatar, Button } from 'react-native-paper';
import Icon from "react-native-vector-icons/Feather";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"

import axios from 'axios';
import baseURL from "../../assets/common/baseUrl";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { useSelector, useDispatch } from "react-redux";

import ProductList from "../Market/ProductList";
import { updateVendorFollowers } from '../../Redux/Reducers/vendorSlice';
import { updateUserFollowing } from "../../Context/actions/Auth.actions";
import { updateVendor } from "../../Redux/Reducers/vendorSlice";

var { width } = Dimensions.get('window');

const StoreProfilePage = (props) => {
    const dispatch = useDispatch();
    const context = useContext(AuthGlobal)
    const userProfile = context.stateUser.userProfile;

    const user = context.stateUser.user;
    
    const isAuthenticated = context.stateUser.isAuthenticated;
    console.log('USER', isAuthenticated)
    const userId = user.userId;
    const [ loading, setLoading ] = useState(true);
    const vendor = useSelector((state) => state.vendors.vendor)
    const vendorLikes = vendor.likes;
    const vendorIsLiked = Boolean(vendorLikes[userId]);
    const vendorLikeCount = Object.keys(vendorLikes).length;

    const products = useSelector((state)=> state.stateProducts.products);

    const token = props.route.params.token;
    const vendorId = vendor.id;
    const followCheck = Boolean(vendor.followers[userId])
    const isFollowing = followCheck;

    const followersCount = Object.keys(vendor.followers).length;
    const productCount = Object.keys(products).length;
    const follwersCount = Object.keys(vendor.followers).length;

    useEffect(() => {
        props.navigation.setOptions({
            title: vendor.brand
        });
        setLoading(false);
    }, [vendor.brand, props.navigation])

    const patchVendorLike = async () => {
        const response = await fetch(`${baseURL}users/${vendorId}/like`, {
            method: "PATCH",
            headers : {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({userId: userId}),
        })
        const updatedVendor = await response.json();
        dispatch(updateVendor({vendor:updatedVendor}))
    };

    const subscribeUser = () => {     
        if (vendorId !== userId) {
            const variables = {
                vendorId:vendorId, 
                userId: userId
            }
            axios.patch(`${baseURL}users/subscribeUser`, variables, {
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` },
                })
                .then(res => {
                    if(res.data) {
                        const checkFollowers = res.data.find(x=>x.id==vendorId).followers;
                        dispatch(updateVendorFollowers({followers:checkFollowers}))
    
                        const checkFollowing = res.data.find(x=>x.id == userId).following;
                        const checkedFollowingArray = Object.keys(checkFollowing);
                        const updateProfile =() => {
                            userProfile.following = checkFollowing;
                            return (
                                userProfile
                            )
                        }
                        const updatedUserProfile = updateProfile()
                        dispatch(updateUserFollowing({following:updatedUserProfile}));
                    } else {
                        alert('Please login')
                    }
                }) 
        } else {
            alert("Can not follow yourself!")
        }
            
    }

    return(
        <ScrollView style={styles.container}>        
            <View style={styles.profileContainer}>
                <Avatar.Image size={90} source={{url:vendor.image}} style={{marginRight:20, marginLeft: 10}} />
                <View style={styles.profileItemContainer}>
                    <View style={styles.profileItem}>
                        <Text style={styles.itemBold}>{vendor.followers? followersCount : 0}</Text>
                        <Text style={styles.profileItemText}>팔로워</Text>
                    </View>
                    <View style={styles.profileItem}>
                        <Text style={styles.itemBold}>{vendorLikes ? vendorLikeCount : 0}</Text>
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
            {isAuthenticated
            ?
                <View style={styles.profileBtnContainer}>
                    {isFollowing
                    ?   <Button style={styles.allBtn} 
                            contentStyle={{width:100}}
                            color="#333333"
                            mode="contained"
                            dark={true}
                            uppercase={false}
                            labelStyle={{fontSize:13}}
                            onPress={()=> subscribeUser()}
                        >
                            <Icon name="user-check" size={18} color="tomato"/>
                        </Button>
                    :   <Button style={styles.followBtn} 
                            contentStyle={{width:100}}
                            color="#333333"
                            mode="contained"
                            dark={true}
                            uppercase={false}
                            labelStyle={{fontSize:13}}
                            onPress={()=> subscribeUser()}
                        >
                            <Icon name="user-plus" size={18} color="#fff"/>
                        </Button>
                    }

                    {vendorIsLiked 
                    ?   <Button style={styles.allBtn} 
                            contentStyle={{width:100}}
                            color="#333333"
                            mode="contained"
                            dark={true}
                            uppercase={false}
                            labelStyle={{fontSize:13}}
                            onPress={()=> patchVendorLike()}
                        >
                            <MaterialIcon name="cards-heart" size={18} color="tomato"/>
                        </Button>
                    :   <Button style={styles.allBtn} 
                            contentStyle={{width:100}}
                            color="#333"
                            mode="contained"
                            dark={true}
                            uppercase={false}
                            labelStyle={{fontSize:13}}
                            onPress={()=> patchVendorLike()}
                        >
                            <MaterialIcon name="cards-heart-outline" size={18} color="white"/>
                        </Button>
                    }
                    
                    <Button style={styles.allBtn} 
                        contentStyle={{width:100}}
                        color="#333333"
                        mode="contained"
                        dark={true}
                        uppercase={false}
                        labelStyle={{fontSize:13}}
                        onPress={()=> alert('comment')}
                    >
                        <Icon name="message-circle" size={18} color="white"/>
                    </Button>
                </View> 
            :   <View style={{}}>
                    <Button 
                        style={styles.loginBtn}
                        color="#fff"
                        mode="contained"
                        dark={false}
                        uppercase={false}
                        labelStyle={{fontSize:13}}
                        onPress={()=> alert('LOGIN')}
                        >
                            <Text style={{color: '#fff'}}>로그인이 필요합니다</Text>
                    </Button>
                </View>
            }
                
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
    }, 
    loginBtn : {
        width: width,
        justifyContent: "center",
        backgroundColor:'tomato',
        marginLeft: 10,
        marginRight: 20,
    },
    followBtn : {
        width: 100,
        marginRight: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'tomato'        
    }
})

export default StoreProfilePage;