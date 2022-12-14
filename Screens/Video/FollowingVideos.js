import React, {useState, useCallback, useEffect, useContext } from "react";
import { StatusBar, Text, View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGlobal from "../../Context/store/AuthGlobal";

import VideoCompiler from './VideoCompiler';

// import functions to access database
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
import { useDispatch } from "react-redux";

var { width, height } = Dimensions.get('window');

const FollowingVideos = (props) => {

    const [ videos, setVideos ] = useState([]);
    const [ active, setActive ] = useState();
    const [ loading, setLoading ] = useState(true);
    const [ token, setToken] = useState();
    const [ popular, setPopular] = useState(false);

	const context = useContext(AuthGlobal);
    const userAuthenticated = context.stateUser.isAuthenticated;
    const userId = context.stateUser.user.userId;

    let following = [];
    if (userAuthenticated) {
        following = Object.keys(context.stateUser.userProfile.following)
    }

    useEffect(()=> {
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res)
            })
            .catch((error) => console.log('There is an error with the token'));
    }, [])
   
    useFocusEffect((
        useCallback(
            () => {
                setActive(-1);
                const variables = {"following": following};
                {
                    userAuthenticated 
                    ? 
                        axios
                            .post(`${baseURL}videos/${userId}/followingVideos`, variables, {
                                headers: { 
                                    'Content-Type': 'application/json', 
                                    'Authorization': `Bearer ${token}` }
                            })
                            .then((res) => {
                                setVideos(res.data);
                                setLoading(false);
                            })
                            .catch((error) => {
                                console.log('?????? ????????? ????????? ????????????:',error.message)
                            })
                    :   setVideos([])  
                }
                
            },
            [token],
        )
    ))

    return (
        <>
            {userAuthenticated ? 
                <>
                    <StatusBar
                        translucent
                        backgroundColor='transparent'
                        barStyle='light-content'
                    />
                    <Container>
                        <VideoCompiler videos={videos} props={props} />
                    </Container> 
                </>
                :   
                <>
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>?????????????????? ????????????</Text>
                    </View>
                </>
            }            
        </>
    )
}

const Container = styled.View`
    flex:1;
    background: transparent;
`

const styles = StyleSheet.create({
    emptyContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        width: width,
        height: height
    },
    emptyText: {
        color: '#fff',
        fontSize: 15
    }
})

export default FollowingVideos;









