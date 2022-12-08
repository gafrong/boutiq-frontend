import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Avatar, Button } from 'react-native-paper';
import Icon from "react-native-vector-icons/Feather";

const StoreProfilePage = (props) => {
    // console.log('Store Profile Page', props)
    const storeProfile = props.route.params.videoProfile;
    const user = props.route.params.user;
    return(
        <Container>  
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Button
                    size={45}
                    style={styles.goBackBtn}>
                    <Icon 
                        name="chevron-left"
                        style={{}}
                        color={"#ffffff"}
                        size={32}
                    />
                </Button>
            </TouchableOpacity>
            <StoreHeader>{storeProfile.createdBy.username}</StoreHeader>         
            <ProfileContainer>
                <Avatar.Image size={90} source={'https://picsum.photos/700'} style={{marginRight:20, marginLeft: 10}} />
                <ProfileItemContainer>
                    <ProfileItem>
                        <ProfileItemText style={styles.itemBold}>{storeProfile.followers}</ProfileItemText>
                        <ProfileItemText>팔로워</ProfileItemText>
                    </ProfileItem>
                    <ProfileItem>
                        <ProfileItemText style={styles.itemBold}>{storeProfile.like}</ProfileItemText>
                        <ProfileItemText>좋아요</ProfileItemText>
                    </ProfileItem>
                    <ProfileItem>
                        <ProfileItemText style={styles.itemBold}>{storeProfile.numViews}</ProfileItemText>
                        <ProfileItemText>리뷰</ProfileItemText>
                    </ProfileItem> 
                </ProfileItemContainer>     
            </ProfileContainer> 
            <ProfileDetail>
                <Text style={{color:'#ffffff', marginBottom:5}}>{storeProfile.brand.toUpperCase()}</Text>
                <Text style={{color:'#ffffff'}}>{storeProfile.description}</Text>
            </ProfileDetail> 
            <ProfileButtonContainer>
                <Button style={styles.allBtn} 
                    contentStyle={{width:100}}
                    color="#333333"
                    mode="contained"
                    dark={true}
                    uppercase={false}
                    labelStyle={{fontSize:13}}
                    onPress={()=> alert('follow')}
                >
                    <Icon name="user-plus" size={18} color="white"/>
                </Button>
                <Button style={styles.allBtn} 
                    contentStyle={{width:100}}
                    color="#333333"
                    mode="contained"
                    dark={true}
                    uppercase={false}
                    labelStyle={{fontSize:13}}
                    onPress={()=> alert('follow')}
                >
                    <Icon name="heart" size={18} color="white"/>
                </Button>
                <Button style={styles.allBtn} 
                    contentStyle={{width:100}}
                    color="#333333"
                    mode="contained"
                    dark={true}
                    uppercase={false}
                    labelStyle={{fontSize:13}}
                    onPress={()=> alert('follow')}
                >
                    <Icon name="message-circle" size={18} color="white"/>
                </Button>
            </ProfileButtonContainer>              
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: #000000;
    flex-direction: column;
`
const ProfileContainer = styled.View`
    flex-direction: row;
    padding-top: 2px;
    margin-left: 10px;
    margin-top: 15px;
    margin-right: 10px;
`
const ProfileItemContainer = styled.View`
    flex-direction: row;
`
const ProfileItem = styled.View`
    flex-dierction: column;
    margin-top: 28px;
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
    justify-content: center;
    width: 100%;
    text-align: center;
    margin-top: 0px;
`
const StoreHeader = styled.Text`
    position:relative;
    color: #ffffff;
    text-align: center;
    font-weight: 700;
    margin-top: 30px;
`
const ProfileDetail = styled.View`
    padding: 15px;
`
const styles = StyleSheet.create({
    goBackBtn: {
        margin: 10,
        marginTop: 12,
        width: 30,
        height: 50,
        alignItems: 'center',
        position:'absolute'
    }, 
    itemBold:{
        fontSize:15,
        fontWeight: "bold"
    },
    allBtn: {
        width: 100,
        marginRight: 15,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default StoreProfilePage;