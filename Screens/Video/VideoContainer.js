import React, {useState, useCallback, useEffect } from "react";
import { StatusBar, Animated, TouchableOpacity, StyleSheet, ActivityIndicator, View } from 'react-native';
import styled from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import VideoCompiler from './VideoCompiler';

// import functions to access database
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
import { useDispatch } from "react-redux";


const VideoContainer = (props) => {

    const [ videos, setVideos ] = useState([]);
    const [ active, setActive ] = useState();
    const [ loading, setLoading ] = useState(true);
    const [ token, setToken] = useState();
    const [ popular, setPopular] = useState(true);
    const [ following, setFollowing] = useState(false);

    const dispatch = useDispatch();

    useEffect(()=> {
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res)
            })
            .catch((error) => console.log("Possible token error"));
    }, [])
    
    // react navigation when in focus a screen will use callback. useful when we have several products in the same navigation, so that when we come back, there will be a callback for data changes
    useFocusEffect((
        useCallback(
            () => {
                setActive(-1);
                // Videos from database
                axios
                    .get(`${baseURL}videos`)
                    .then((res) => {
                        setVideos(res.data);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.log('서버 연결에 문제가 있습니다:',error.message)
                    })
        
                return () => {
                    setVideos([])
                    setActive()
                }
            },
            [],
        )
    ))

    return(
        <>
            {loading == false ? (
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
            )  : (
                // Loading
                <View style={styles.loadingContainer}>
                    <View>
                        <ActivityIndicator size="large" color="tomato" />
                    </View>
                </View> 
            )
            } 
            
        </>
    )
}


const Container = styled.View`
    flex:1;
    background: transparent;
`
const styles = StyleSheet.create({
    loadingContainer:{
        flex:1,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor:'#222222',
    }
});

export default VideoContainer;