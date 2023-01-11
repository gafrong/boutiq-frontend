import React, {useState, useContext} from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button } from 'react-native-paper';
import Icon from "react-native-vector-icons/Feather";
import { useSelector, useDispatch  } from "react-redux";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { updateVendorFollowers } from '../../Redux/Reducers/vendorSlice';
import { updateUserFollowing } from "../../Context/actions/Auth.actions";
import AuthGlobal from "../../Context/store/AuthGlobal";

const StoreProfile = (props) => {
    const dispatch = useDispatch();
    const context = useContext(AuthGlobal)
    const userProfile = context.stateUser.userProfile;
    const user = context.stateUser.user;
    const userId = user.userId;
    const vendor = useSelector((state) => state.vendors.vendor)
    const vendorId = vendor.id;
    const token = props.route.params.token;

    const followCheck = Boolean(vendor.followers[userId])
    const isFollowing = followCheck;
    const followersCount = Object.keys(vendor.followers).length;

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
                        const checkExist = checkedFollowingArray.includes(vendorId)
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
        <View style={styles.container}>           
            <View style={styles.profileContainer}>
                <Avatar.Image size={50} source={{url: vendor.image}} style={{marginRight:20, marginLeft: 20}} />
                <View style={styles.profileItemContainer}>
                    <View style={styles.profileItem}>
                        <Text style={styles.itemBold}>{followersCount? followersCount : 0}</Text>
                        <Text style={styles.profileItemText}>팔로워</Text>
                    </View>
                    <View style={styles.profileItem}>
                        <Text style={styles.itemBold}>{vendor.like ? vendor.like : 0}</Text>
                        <Text style={styles.profileItemText}>좋아요</Text>
                    </View>
                    <View style={styles.profileItem}>
                        <Text style={styles.itemBold}>{vendor.videos? vendor.videos.length : 0}</Text>
                        <Text style={styles.profileItemText}>영상</Text>
                    </View> 
                </View>     
            </View>  
            <View style={styles.profileBtnContainer}>
                {isFollowing 
                ? <>
                    <Button style={styles.unfollowBtn} 
                        contentStyle={{width:60}}
                        color="#333333"
                        mode="contained"
                        dark={true}
                        uppercase={false}
                        labelStyle={{fontSize:13}}
                        onPress={()=> subscribeUser()}
                    >
                        <Icon name="user-check" size={18} color="#777"/>
                    </Button>
                    <Button style={[styles.allBtn, {width:200}]} 
                        contentStyle={{width:200}}
                        color="#333333"
                        mode="contained"
                        dark={true}
                        uppercase={false}
                        labelStyle={{fontSize:13}}
                        onPress={()=> props.navigation.navigate('StoreProfilePage', {token:token, vendor:vendor})}
                    >더보기<Icon style={{alignItems:"center", lineHeight:40}} name="chevron-right" size={13} color="white"/>
                    </Button>
                </>
                : <>
                    <Button style={styles.followBtn} 
                        contentStyle={{width:150}}
                        color="#333333"
                        mode="contained"
                        dark={true}
                        uppercase={false}
                        labelStyle={{fontSize:13}}
                        onPress={()=> subscribeUser()}
                    >
                        <Icon name="user-plus" size={18} color="white"/>
                    </Button>
                    <Button style={[styles.allBtn, {width:150}]} 
                        contentStyle={{width:150}}
                        color="#333333"
                        mode="contained"
                        dark={true}
                        uppercase={false}
                        labelStyle={{fontSize:13}}
                        onPress={()=> props.navigation.navigate('StoreProfilePage', {token:token, vendor:vendor})}
                    > 더보기<Icon style={{alignItems:"center", lineHeight:40}} name="chevron-right" size={13} color="white"/>
                    </Button>
                    </>
                }
            </View>              
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#000000",
        flexDirection:'column',
        marginLeft: 10,
        marginTop: 15,
    },
    profileBtnContainer:{
        flexDirection: 'row',
        height: 38,
        margin: 10,
        marginLeft: 0,
        width: '100%'
    },
    profileContainer:{
        flexDirection: 'row',
        paddingTop: 2,
    },
    profileItemContainer:{
        flexDirection: 'row',
    },
    profileItem: {
        flexDirection: 'column',
        marginTop: 8,
        marginRight: 25,
        marginBottom: 12,
        marginLeft: 10,
        paddingRight: 0,
    },
    profileItemText:{
        color: '#ffffff',
    },
    goBackBtn: {
        margin: 10,
        marginTop: 10,
        width: 30,
        height: 50,
        alignItems: 'center',
    }, 
    itemBold:{
        fontSize:15,
        fontWeight: "bold",
        color: '#ffffff',
    },
    allBtn: {
        width: 50,
        marginLeft: 13,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    followBtn: {
        width: 150,
        marginLeft: 13,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'tomato'
    },
    unfollowBtn: {
        width: 50,
        marginLeft: 13,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default StoreProfile;