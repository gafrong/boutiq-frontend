import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import VideoPlayer from './VideoPlayer';
import Gradient from '../../Shared/StyledComponents/Gradient';

const { height } = Dimensions.get('window')


const VideoContainer = (props) => {
    return(
        <View>
            <VideoPlayer/>
            <Gradient
                locations={[0, 0.26, 0.6, 1]}
                colors={[
                    'rgba(26,26,26,0)',
                    'rgba(26,26,26,0)',
                    'rgba(26,26,26,0)',
                    'rgba(26,26,26,1)'
                ]}>
            </Gradient>
        </View>
    )
}

export default VideoContainer;