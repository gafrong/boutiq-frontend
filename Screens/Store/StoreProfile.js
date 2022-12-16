import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button } from 'react-native-paper';
import Icon from "react-native-vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";

const StoreProfile = (props) => {
    const vendor = useSelector((state) => state.vendors.vendor)

    // console.log('VIDEOS', props.route.params.videoProps)
    return(
        <View style={styles.container}>           
            <View style={styles.profileContainer}>
                <Avatar.Image size={50} source={'https://picsum.photos/700'} style={{marginRight:20, marginLeft: 20}} />
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
                        <Text style={styles.itemBold}>{vendor.videos.length}</Text>
                        <Text style={styles.profileItemText}>영상</Text>
                    </View> 
                </View>     
            </View>  
            <View style={styles.profileBtnContainer}>
                <Button style={styles.allBtn} 
                    contentStyle={{width:60}}
                    color="#333333"
                    mode="contained"
                    dark={true}
                    uppercase={false}
                    labelStyle={{fontSize:13}}
                    onPress={()=> alert('follow')}
                >
                    <Icon name="user-plus" size={18} color="white"/>
                </Button>
                <Button style={[styles.allBtn, {width:200}]} 
                    contentStyle={{width:200}}
                    color="#333333"
                    mode="contained"
                    dark={true}
                    uppercase={false}
                    labelStyle={{fontSize:13}}
                    onPress={()=> props.navigation.navigate('StoreProfilePage', {vendor})}
                >   <Text style={{paddingRight:5, alignItems:"center", lineHeight:60, fontSize:13}}>더보기</Text>
                    <Icon style={{alignItems:"center", lineHeight:40}} name="chevron-right" size={13} color="white"/>
                </Button>
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
    }
})

export default StoreProfile;