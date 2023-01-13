import React, {useState, useCallback, useEffect, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity, View, Text, StyleSheet, Pressable, Animated, StatusBar, Keyboard } from 'react-native'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthGlobal from "../../Context/store/AuthGlobal";

import FollowingVideos from "./FollowingVideos";
import VideoContainer from "./VideoContainer";


const VideosMain = (props) => {

    const [ videos, setVideos ] = useState([]);
    const [ token, setToken ] = useState('');
    const navigation = useNavigation();
	const context = useContext(AuthGlobal);
    const userAuthenticated = context.stateUser.isAuthenticated;
    const [isPopular, setIsPopular] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    Keyboard.dismiss();
    useEffect(()=> {
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res)
            })
            .catch((error) => console.log("There is an error with t"));
    }, [])

    return(
        <>
            <Container>
                {userAuthenticated ?
                    <TouchableOpacity onPress={()=> navigation.navigate('BookmarkedVideos', {user:context.stateUser.user.userId})} style={styles.bookmark}>
                        <Icon
                            size={28}
                            name="bookmark-outline"
                            color={"#fff"}
                        />
                    </TouchableOpacity>
                : null
                }
                
                <TouchableOpacity onPress={()=> [setIsPopular(true), setIsFollowing(false)]}>
                    <Menu bold={isPopular}>Popular</Menu>
                </TouchableOpacity>
                
                <Separator />
                <TouchableOpacity onPress={()=> [setIsPopular(false), setIsFollowing(true)]}>
                    <Menu bold={isFollowing}>Following</Menu>
                </TouchableOpacity>
            </Container>
            {isFollowing ? <FollowingVideos/> : <VideoContainer/> }
              
        </>
    )
}



const styles = StyleSheet.create({
    bookmark:{
		position: 'absolute',
		left: 15,
		top: 8
    }
})

const Container = styled.View`
	top: 22px;
	width: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	position: absolute;
	z-index: 1;
`
const Menu = styled.Text`
	color: #fff;
	letter-spacing: 0.8px;
	margin: 11px 12px;
	font-weight: ${props => (props.bold ? 'bold' : 'normal')};
	opacity: ${props => (props.bold ? 1 : 0.8)};
	font-size: ${props => (props.bold ? '16px' : '15px')};
`
const Separator = styled.View`
	width: 1px;
	height: 13px;
	background-color: #d8d8d8;
	opacity: 0.6;
`
export default VideosMain;