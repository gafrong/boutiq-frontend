import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Feather'
import styled from "styled-components";
import { Avatar, IconButton, Button } from 'react-native-paper';

const StoreContainer = (props) => {
    console.log('store props', props)
    return(
        <Container>
            <Button
                size={45}
                style={styles.goBackBtn} onPress={() => props.navigation.goBack()} >
                <Icon 
                    name="chevron-left"
                    style={{}}
                    color={"#ffffff"}
                    size={32}
                />
            </Button>
            <StoreHeader>{props.route.params.user.username}</StoreHeader>
            <ProfileContainer>
                <Avatar.Image size={90} source={require('../../assets/gal6.jpg')} style={{marginRight:20}} />
                <ProfileItem>
                    <ProfileItemText style={styles.itemBold}>25</ProfileItemText>
                    <ProfileItemText>팔로워</ProfileItemText>
                </ProfileItem>
                <ProfileItem>
                    <ProfileItemText style={styles.itemBold}>14.5K</ProfileItemText>
                    <ProfileItemText>상품 찜</ProfileItemText>
                </ProfileItem>
                <ProfileItem>
                    <ProfileItemText style={styles.itemBold}>14.5K</ProfileItemText>
                    <ProfileItemText>좋아요</ProfileItemText>
                </ProfileItem>
            </ProfileContainer>
        </Container>
    )
}

const Container = styled.View`
    flex:1;
    background-color: orange;
`
const ProfileContainer = styled.View`
    flex-direction: row;
    margin-left: 10px;
    margin-top: 15px;
`
const ProfileItem = styled.View`
    flex-dierction: column;
    padding:10px;
    margin: 10px;
    padding-top: 16px;
    margin-right: 0;
    padding-right: 0;
`
const ProfileItemText = styled.Text`
    color: #ffffff;
`
const StoreHeader = styled.Text`
    position:relative;
    color: #ffffff;
    text-align: center;
    font-weight: 700;
    margin-top: -40px;
`

const styles = StyleSheet.create({
    goBackBtn: {
        margin: 10,
        marginTop: 10,
        width: 30,
        height: 50,
        alignItems: 'center',
    }, 
    itemBold:{
        fontSize:15,
        fontWeight: "bold"
    }
})

export default StoreContainer;