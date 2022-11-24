import React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import styled from 'styled-components';

import VideoPlayer from './VideoPlayer';
import VideoCompiler from './VideoCompiler';
// import Gradient from '../../Shared/StyledComponents/Gradient';

// const { height } = Dimensions.get('window')

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
                <VideoCompiler videos={api}/>
            </Container>    
        </>
    )
}

export default VideoContainer;