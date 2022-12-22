import React, {useContext, useEffect, useState, useRef, useCallback, useMemo }  from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Dimensions, ScrollView, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import BottomSheetModal from '@gorhom/bottom-sheet';
import {Portal, PortalHost} from '@gorhom/portal';
import { Avatar } from 'react-native-paper';

import AuthGlobal from '../../../Context/store/AuthGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../../../assets/common/baseUrl';

import { useDispatch } from 'react-redux';
import { setVideoProducts } from '../../../Redux/Reducers/productSlice';
import { setVendor } from '../../../Redux/Reducers/vendorSlice';

var { width } = Dimensions.get('window');

const Sidebar = (props) => {
    const context = useContext(AuthGlobal);
    const userAuthenticated = context.stateUser.isAuthenticated;
    const videoProps = props.videoProps;
    const [video, setVideo] = useState(videoProps);
    const [token, setToken] = useState();
    const vendor = videoProps.createdBy;
    const videoId = video.id;
    const videoLikes = video.likes;
    const loggedInUserId = context.stateUser.user.userId;
    const isLiked = Boolean(videoLikes[loggedInUserId]);
    const likeCount = Object.keys(videoLikes).length;

    const dispatch = useDispatch();

    useEffect(()=> {
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res)
            })
            .catch((error) => console.log(error));
    }, [])

    const patchVideoLike = async () => {
        const response = await fetch(`${baseURL}videos/${videoId}/like`, {
            method: "PATCH",
            headers : {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({userId: loggedInUserId}),
        })
        const updatedVideo = await response.json();
        setVideo(updatedVideo);
    };

    // BottomSheet for Comments
    const [isOpen, setIsOpen] = useState(false)
    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => ["80%"], []);
    const [text, onChangeText] = useState(null);
    // callbacks
    const handleSheetChange = useCallback((index) => {
        // console.log("handleSheetChange", index);
    }, []);
    const handleSnapPress = useCallback((index) => {
        sheetRef.current?.snapToIndex(index);
    }, []);
    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
    }, []);

	return (
        <>  
            <Portal>
                <BottomSheetModal
                    detached
                    ref={sheetRef}
                    snapPoints={snapPoints}
                    onChange={handleSheetChange}
                    enablePanDownToClose={true}
                    index={-1}
                    backgroundStyle={{backgroundColor:"#222"}}
                    handleIndicatorStyle={{backgroundColor:"#fff"}}
                >   
                    <TouchableOpacity onPress={() => {handleClosePress(); setIsOpen(false);}} style={{zIndex: 1}}>
                        <Icon 
                            name="close" 
                            size={20} 
                            color={'#fff'}
                            style={styles.closeBtn}
                        />
                    </TouchableOpacity>
                    <View style={styles.commentArea}>
                        <ScrollView style={styles.commentArea} contentContainerStyle={{flex:1}}>
                            <Text style={styles.white}>This is the comments testing area</Text>
                            <Text style={styles.white}>This is the comments testing area</Text>
                            <Text style={styles.white}>This is the comments testing area</Text>
                        </ScrollView>          
                        <View style={styles.inputArea}>
                            <Avatar.Image 
                                size={35} 
                                source={{url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/220px-Golde33443.jpg"}} 
                                style={styles.commentorImg} />
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeText}
                                value={text}
                                placeholder="글을 남기세요.."
                                placeholderTextColor="#777"
                                selectionColor={"tomato"}
                                maxLength={140}
                                autoFocus={true}
                                blurOnSubmit={true}
                                clearButtonMode="always"
                            />
                            <Icon
                                name="arrow-up-circle"
                                size={28}
                                color={'tomato'}
                                style={styles.submitIcon}
                            />
                        </View>
                    </View>             
                </BottomSheetModal>
            </Portal>
            <PortalHost name="video_comment_host" />
            <Container>
                <TouchableOpacity 
                    onPress={() => [
                        dispatch(setVideoProducts({videoProducts:videoProps.videoItems})),
                        dispatch(setVendor(vendor)),
                        props.props.navigation.navigate('Store', {seller:vendor})
                    ]}>
                    <Menu>
                        <User>
                            <ThumbImg resizeMode='cover' source={{uri: props.avatar}}/>
                        </User>
                    </Menu>
                </TouchableOpacity>
                {userAuthenticated 
                ? <TouchableOpacity onPress={()=> patchVideoLike()}>
                    <Menu>
                        {isLiked 
                        ? <Icon 
                            name="cards-heart" 
                            size={28} 
                            color={'red'}/>
                        : <Icon 
                            name="cards-heart-outline" 
                            size={28} 
                            color={"#ffffff"}/> }
                        <Count>{likeCount}</Count>
                    </Menu>
                </TouchableOpacity>
                : <TouchableOpacity onPress={()=> alert('Please login')}>
                    <Menu>
                        <Icon 
                            name="heart" 
                            size={25} 
                            color={"#ffffff"}/>
                        <Count>{likeCount}</Count>
                    </Menu>
                </TouchableOpacity>
                }
                <TouchableOpacity onPress={()=>alert("slide up comment field")}>
                    <Menu>
                        <Icon
                            size={28}
                            name="bookmark-outline"
                            color={"#ffffff"}
                        />
                        <Count>{video.rating}</Count>
                    </Menu>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> {handleSnapPress(0); setIsOpen(true);}}>
                    <Menu>
                        <Icon
                            size={25}
                            name="comment-outline"
                            color={"#ffffff"}
                        />
                        <Count>{video.rating}</Count>
                    </Menu>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>alert("slide up sharing field")}>
                    <Menu>
                        <Icon 
                            size={26} 
                            name="share" 
                            color={"#ffffff"}/>
                        <Count>{video.numReviews}</Count>
                    </Menu>
                </TouchableOpacity>
            </Container>
        </>
	)
}


const Container = styled.View`
	width: 60px;
	height: 100%;
	padding-bottom: 59px;
	justify-content: flex-end;
    right: 10px;
    position: absolute;
    z-index:1;
`
const Menu = styled.View`
	margin: 6px 0;
	align-items: center;
`
const User = styled.View`
	width: 48px;
	height: 48px;
	margin-bottom: 13px;
`
const ThumbImg = styled.Image`
	width: 100%;
	height: 100%;
	border-radius: 48px;
	border-width: 2px;
	border-color: #ffffff;
`
const Count = styled.Text`
	color: #fff;
	font-size: 12px;
	letter-spacing: -0.1px;
`
const styles = StyleSheet.create({
    closeBtn:{
        position: 'absolute',
        right: 10,
        top: 0,
        width: 20,
        height: 40,
    },
    commentArea:{
        flex: 1, 
        padding: 10
    },
    white: {
        color: '#fff'
    },
    inputArea:{
        color: '#000',
        backgroundColor: '#444',
        height: 65,
        position: 'absolute',
        bottom:0, 
        width: width,
        padding: 10,
    },
    input: {
        color: '#000',
        backgroundColor: '#eee',
        height: 45,
        position: 'absolute',
        paddingLeft: 15,
        paddingRight: 15,
        bottom: 10,
        width: width -80,
        right: 10,
        borderRadius: 5
    },
    commentorImg: {
        marginTop: 6,
        marginLeft: 7
    },
    submitIcon: {
        right: 15,
        top: 18,
        position: 'absolute'
    }
})
export default Sidebar;