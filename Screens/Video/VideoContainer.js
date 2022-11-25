import React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import styled from 'styled-components';

import VideoCompiler from './VideoCompiler';
import Header from './components/Header';

const Container = styled.View`
    flex:1;
    background: transparent;
`

import api from '../../services/testvideoapi';

const VideoContainer = (props) => {
    return(
        <>
            <StatusBar
                translucent
                backgroundColor='transparent'
                barStyle='light-content'
            />
            <Container>
                <Header />
                <VideoCompiler videos={api} props={props} />
            </Container>    
        </>
    )
}

export default VideoContainer;