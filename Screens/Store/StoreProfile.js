import React from "react";
import { StyleSheet, View, Text } from "react-native";
import styled from "styled-components";
import { Avatar, Button } from 'react-native-paper';
import Icon from "react-native-vector-icons/Feather";

const StoreProfile = (props) => {
    // console.log('Store Profile', props)
    const profile = props.route.params.videoProps;
    const user = props.route.params.user;
    // console.log('profile', profile)
    return(
        <Container>           
            <ProfileContainer>
                <Avatar.Image size={50} source={'https://picsum.photos/700'} style={{marginRight:20, marginLeft: 20}} />
                <ProfileItemContainer>
                    <ProfileItem>
                        <ProfileItemText style={styles.itemBold}>{profile.followers}</ProfileItemText>
                        <ProfileItemText>팔로워</ProfileItemText>
                    </ProfileItem>
                    <ProfileItem>
                        <ProfileItemText style={styles.itemBold}>{profile.like}</ProfileItemText>
                        <ProfileItemText>좋아요</ProfileItemText>
                    </ProfileItem>
                    <ProfileItem>
                        <ProfileItemText style={styles.itemBold}>{profile.numViews}</ProfileItemText>
                        <ProfileItemText>리뷰</ProfileItemText>
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
                    onPress={()=> props.navigation.navigate('StoreProfilePage', {user, profile})}
                >   <Text style={{paddingRight:5, alignItems:"center", lineHeight:60, fontSize:13}}>더보기</Text>
                    <Icon style={{alignItems:"center", lineHeight:40}} name="chevron-right" size={13} color="white"/>
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
    height: 38px;
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
        flexDirection: "row"
    }
})

export default StoreProfile;