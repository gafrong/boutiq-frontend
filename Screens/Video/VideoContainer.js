import React, {useState, useCallback, useContext } from "react";
import { StatusBar } from 'react-native';
import styled from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';

import VideoCompiler from './VideoCompiler';
import Header from './components/Header';

// import functions to access database
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";


import AuthGlobal from "../../Context/store/AuthGlobal";

const VideoContainer = (props) => {
    const [ videos, setVideos ] = useState([]);
    const [ videosFiltered, setVideosFiltered ] = useState([]);
    const [ focus, setFocus] = useState();
    const [ active, setActive ] = useState();
    const [ initialState, setInitialState ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const dispatch = useDispatch();

    // const videos = useSelector((state)=> state.stateProducts.videos)

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
                        setVideos(res.data);
                        setVideosFiltered(res.data);
                        setInitialState(res.data);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.log('서버 연결에 문제가 있습니다:',error.message)
                    })
        
                return () => {
                    // setVideos([])
                    setVideosFiltered([])
                    setFocus()
                    setActive()
                    setInitialState()
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
                <Header />
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