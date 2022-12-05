import React, {useContext, useEffect, useState,}  from 'react'
import {Pressable} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import styled from 'styled-components/native'

import { connect } from 'react-redux';
import * as actions from '../../../Redux/Actions/likeVideoActions'
import AuthGlobal from '../../../Context/store/AuthGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../../../assets/common/baseUrl';

const Sidebar = (props) => {
    const productObj = props.props.route;
    const owner = props.owner;
    const videoProps = props.videoProps;
    
    const videoId = videoProps.id;

    const context = useContext(AuthGlobal);
    // console.log('context', context)
    const loggedInUserId = context.stateUser.user.userId;
    const isLiked = Boolean(videoProps.likes[loggedInUserId]);
    const likeCount = videoProps.likes;
    const [token, setToken] = useState();
    const [like, setLike] = useState();
    
    console.log('SIDEBAR PROPS', props)
    console.log('LIKES', props.videoProps.likes)
    // console.log('ISLIKED', isLiked);
    // console.log('likeCount', likeCount);
    const patchVideoLike = async () => {
        console.log('token', token);
        const response = await fetch(`${baseURL}videos/${videoId}/like`, {
            method: "PATCH",
            headers : {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({userId: loggedInUserId}),
        })
        const updatedVideo = await response.json();
    };

    useEffect(()=> {
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res)
            })
            .catch((error) => console.log(error))
    }, [])

	return (
		<Container>
            <Pressable 
                onPress={() => [
                    props.props.navigation.navigate('Store', props)
                ]}>
                <Menu>
                    <User>
                        <Avatar resizeMode='cover' source={{uri: props.avatar}}/>
                    </User>
                </Menu>
            </Pressable>
            <Pressable onPress={()=> patchVideoLike()}>
                <Menu>
                    <Icon 
                        name="heart" 
                        size={25} 
                        color={(isLiked? 'red' : "#ffffff")}/>
                    <Count>0</Count>
                </Menu>
            </Pressable>
            <Pressable onPress={()=>alert("slide up comment field")}>
			<Menu>
				<Icon
					size={25}
					name="message-circle"
                    color={"#ffffff"}
				/>
				<Count>{videoProps.rating}</Count>
			</Menu>
            </Pressable>
            <Pressable onPress={()=>alert("slide up sharing field")}>
                <Menu>
                    <Icon 
                        size={25} 
                        name="send" 
                        color={"#ffffff"}/>
                    <Count>{videoProps.numReviews}</Count>
                </Menu>
            </Pressable>
		</Container>
	)
}

const mapStateToProps = (state) => {
    const { likeVideoReducer } = state;
    return {
        likeVideoReducer: likeVideoReducer
    }
}

// import setVideoLike method that we've created in the Redux store to set like. Use dispatch redux method to do that
const mapDispatchToProps = (dispatch) => {
    return {
        // call our method setVideoLike and use actions that we've created in Redux folder and use dispatch redux method
        setVideoLike: () => dispatch(actions.setVideoLike({like : updatedVideo}))
    }
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
	margin: 9px 0;
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);