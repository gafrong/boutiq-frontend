import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import styled from 'styled-components/native';

/** Debug Only */
const Poster = styled.ImageBackground`
    height: 100%;
`
const VideoPlayer = (props) => {
    return(
        <Poster source={require('../../assets/gal6.jpg')}/>
    )
}

export default VideoPlayer;