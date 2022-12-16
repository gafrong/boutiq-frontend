import React, {useContext, useEffect, useState,}  from 'react'
import {Pressable} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'

import AuthGlobal from '../../../Context/store/AuthGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../../../assets/common/baseUrl';

import { useDispatch, useSelector } from 'react-redux';
import { setVideoProducts } from '../../../Redux/Reducers/productSlice';
import { setVendor } from '../../../Redux/Reducers/vendorSlice';

const Sidebar = (props) => {
    const context = useContext(AuthGlobal);
    const userAuthenticated = context.stateUser.isAuthenticated;

    const videoProps = props.videoProps;
    const [video, setVideo] = useState(videoProps);
    const [token, setToken] = useState();
    const vendor = video.createdBy;
    // console.log('VENDOR', vendor)
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

	return (
		<Container>
            <Pressable 
                onPress={() => [
                    dispatch(setVideoProducts({videoProducts:videoProps.videoItems})),
                    dispatch(setVendor(vendor)),
                    props.props.navigation.navigate('Store', props)
                ]}>
                <Menu>
                    <User>
                        <Avatar resizeMode='cover' source={{uri: props.avatar}}/>
                    </User>
                </Menu>
            </Pressable>
            {userAuthenticated 
            ? <Pressable onPress={()=> patchVideoLike()}>
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
              </Pressable>
            : <Pressable onPress={()=> alert('Please login')}>
                <Menu>
                    <Icon 
                        name="heart" 
                        size={25} 
                        color={"#ffffff"}/>
                    <Count>{likeCount}</Count>
                </Menu>
              </Pressable>
            }
            <Pressable onPress={()=>alert("slide up comment field")}>
                <Menu>
                    <Icon
                        size={28}
                        name="bookmark-outline"
                        color={"#ffffff"}
                    />
                    <Count>{video.rating}</Count>
                </Menu>
            </Pressable>
            <Pressable onPress={()=>alert("slide up comment field")}>
                <Menu>
                    <Icon
                        size={25}
                        name="comment-outline"
                        color={"#ffffff"}
                    />
                    <Count>{video.rating}</Count>
                </Menu>
            </Pressable>
            <Pressable onPress={()=>alert("slide up sharing field")}>
                <Menu>
                    <Icon 
                        size={26} 
                        name="share" 
                        color={"#ffffff"}/>
                    <Count>{video.numReviews}</Count>
                </Menu>
            </Pressable>
		</Container>
	)
}


const Container = styled.View`
	width: 60px;
	height: 100%;
	padding-bottom: 59px;
	justify-content: flex-end;
    right: 10px;
    position: absolute;
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
const Avatar = styled.Image`
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

export default Sidebar;