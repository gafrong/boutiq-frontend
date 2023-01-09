import React, { useEffect, useState} from 'react'
import { TouchableOpacity, Text, StyleSheet, Dimensions, Button } from 'react-native'
import { StatusBar } from 'react-native';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoCompiler from './VideoCompiler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';

var { width } = Dimensions.get("window");

const BookmarkedVideos = (props) => {

    const variables = {userId: props.route.params.user}
    const [token, setToken] = useState();
    const [videos, setVideos] = useState([]);

    useEffect(()=> {
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res)
            })
            .catch((error) => console.log('Error One'));
    }, [])

    useEffect (() => {
        {token 
            ? axios.post(`${baseURL}bookmarks/getBookmarkedVideos`, variables, {
                    headers: { 
                        'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}` }
                })
                .then(response => {
                    if(response.data.success) {
                        setVideos(response.data.result)
                    } else {
                        alert('Failed to load bookmarked videos')
                    }
                })
                .catch((err) => console.log('Error two'))
            : null
        }
        
    }, [token])

    return (
        <>
            <StatusBar
                translucent
                backgroundColor='transparent'
                barStyle='light-content'
            />
            <Container>
                <TouchableOpacity 
                    onPress={()=>props.navigation.goBack()}    
                    style={styles.button}
                >
                    <Icon 
                        name="chevron-left" 
                        size={46} 
                        color={'#fff'}
                        style={styles.closeBtn}
                    />
                </TouchableOpacity>
                <Text style={styles.header}>Saved Videos</Text>
                <VideoCompiler videos={videos} props={props} />
            </Container>    
        </>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#222',
        color: '#fff',
    },
    white: {
        color: '#fff'
    },
    header : {
        color: '#fff',
        position: 'absolute',
        fontSize: 15,
        zIndex: 1,
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center', 
        width: width,
        marginTop: 50,
        fontWeight: 'bold'
    },
    button : {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 5,
        elevation: 3,
        position: 'absolute',
        zIndex: 1,
        top: 26
    },
    buttonText: {
        color: '#fff'
    }
})

const Container = styled.View`
    flex:1;
    background: transparent;
`

export default BookmarkedVideos