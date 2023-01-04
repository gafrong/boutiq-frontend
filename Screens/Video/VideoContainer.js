import React, {useState, useCallback } from "react";
import { StatusBar } from 'react-native';
import styled from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';

import VideoCompiler from './VideoCompiler';
import Header from './components/Header';

// import functions to access database
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
import { useDispatch } from "react-redux";


const VideoContainer = (props) => {
    const [ videos, setVideos ] = useState([]);
    const [ videosFiltered, setVideosFiltered ] = useState([]);
    const [ focus, setFocus] = useState();
    const [ active, setActive ] = useState();
    const [ loading, setLoading ] = useState(true);

    const dispatch = useDispatch();

    // react navigation when in focus a screen will use callback. useful when we have several products in the same navigation, so that when we come back, there will be a callback for data changes
    useFocusEffect((
        useCallback(
            () => {
                setFocus(false);
                setActive(-1);
                // Videos from database
                axios
                    .get(`${baseURL}videos`)
                    .then((res) => {
                        // console.log('INITIAL VIDEOS', res.data)
                        setVideos(res.data);
                        // setVideosFiltered(res.data);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.log('서버 연결에 문제가 있습니다:',error.message)
                    })
        
                return () => {
                    setVideos([])
                    // setVideosFiltered([])
                    // setFocus()
                    // setActive()
                }
            },
            [],
        )
    ))

    return(
        <>
            <StatusBar
                translucent
                backgroundColor='transparent'
                barStyle='light-content'
            />
            <Container>
                <Header props/>
                <VideoCompiler videos={videos} props={props} />
            </Container>    
        </>
    )
}


const Container = styled.View`
    flex:1;
    background: transparent;
`

export default VideoContainer;