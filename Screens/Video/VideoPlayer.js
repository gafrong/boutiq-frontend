import React from 'react';
import { Video } from 'expo-av';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import styled from 'styled-components/native';

const Play = styled(Video)`
    height: 100%;
`
/** Debug Only */
const Poster = styled.ImageBackground`
    height: 100%;
`
const VideoPlayer = ({video, poster, isPlay}) => {
    return isPlay ? (
        <Play
            rate={1.0}
            volume={1.0}
            isMuted={false}
            shouldPlay
            useNativeControls={false}
            posterSource={poster}
            source={video}
            resizeMode='cover'
            isLooping
        />
    ) : (
        <Poster source={poster}/>
    )
}

export default VideoPlayer;