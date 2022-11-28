import React from "react";
import { StyleSheet, View, Text } from "react-native";
import styled from "styled-components";
import { Avatar, Button } from 'react-native-paper';
import Icon from "react-native-vector-icons/Feather";

const StoreProfile = ({user, count}) => {
    console.log('Store Profile', user)
    console.log('Count', count)
    return(
        <Container>           
            <ProfileContainer>
                <Avatar.Image size={50} source={require('../../assets/gal6.jpg')} style={{marginRight:20, marginLeft: 20}} />
                <ProfileItemContainer>
                    <ProfileItem>
                        <ProfileItemText style={styles.itemBold}>{count.comment}</ProfileItemText>
                        <ProfileItemText>팔로워</ProfileItemText>
                    </ProfileItem>
                    <ProfileItem>
                        <ProfileItemText style={styles.itemBold}>{count.share}</ProfileItemText>
                        <ProfileItemText>상품 찜</ProfileItemText>
                    </ProfileItem>
                    <ProfileItem>
                        <ProfileItemText style={styles.itemBold}>{count.like}</ProfileItemText>
                        <ProfileItemText>좋아요</ProfileItemText>
                    </ProfileItem> 
                </ProfileItemContainer>     
            </ProfileContainer>  
            <ProfileButtonContainer>
                <Button style={styles.allBtn} 
                    contentStyle={{width:60}}
                    color="#333333"
                    mode="contained"
                    dark={true}
                    uppercase={false}
                    labelStyle={{fontSize:13}}
                    onPress={()=> alert('follow')}
                >
                    <Icon name="user-plus" size={18} color="white"/>
                </Button>
                <Button style={[styles.allBtn, {width:200}]} 
                    contentStyle={{width:200}}
                    color="#333333"
                    mode="contained"
                    dark={true}
                    uppercase={false}
                    labelStyle={{fontSize:13}}
                    onPress={()=> alert('shop all')}
                >   <Text style={{paddingRight:5}}>더보기</Text>
                    <Icon name="chevron-right" size={18} color="white"/>
                </Button>
            </ProfileButtonContainer>              
        </Container>
    )
}

const Container = styled.View`
    background-color: #000000;
    flex-direction: column;
    margin-left: 10px;
    margin-top: 15px;
`
const ProfileContainer = styled.View`
    flex-direction: row;
    padding-top: 2px;
`
const ProfileItemContainer = styled.View`
    flex-direction: row;
`
const ProfileItem = styled.View`
    flex-dierction: column;
    margin-top: 8px;
    margin-right: 25px;
    margin-bottom: 12px;
    margin-left: 10px;
    padding-right: 0;
`
const ProfileItemText = styled.Text`
    color: #ffffff;
`
const ProfileButtonContainer = styled.View`
    flex-direction: row;
    height: 34px;
    margin: 10px;
    margin-left: 0;
    width: 100%;
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
    },
    allBtn: {
        width: 50,
        marginLeft: 13,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        textAlign: "center"
    }
})

export default StoreProfile;