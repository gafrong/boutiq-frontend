import React from 'react';
import { Video } from 'expo-av';
import styled from 'styled-components/native';

const Play = styled(Video)`
    height: 100%;
`
/** Debug Only */
const Poster = styled.ImageBackground`
    height: 100%;
`
const VideoPlayer = ({video, isPlay}) => {

    return isPlay ? (
        <Play
            rate={1.0}
            volume={1.0}
            isMuted={false}
            shouldPlay
            useNativeControls={false}
            posterSource={video.image}
            source={{uri: video.videoUrl ? video.videoUrl : video.videoId.videoUrl}}
            resizeMode='cover'
            isLooping
        />
    ) : (
        <Poster source={video.image}/>
    )
}

export default VideoPlayer;