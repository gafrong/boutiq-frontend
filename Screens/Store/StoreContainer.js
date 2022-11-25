import React from "react";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/Feather'
import styled from "styled-components";

const StoreContainer = (props) => {
    console.log('store props', props)
    return(
        <Container>
            <Pressable style={styles.goBackBtn}>
                <Icon 
                    name="chevron-left"
                    style={{position: "absolute", left:10, top:30}}
                    color={"#ffffff"}
                    size={30}
                    onPress={() => props.navigation.goBack()}
                />
            </Pressable>
            <StoreHeader>{props.route.params.user.username}</StoreHeader>
        </Container>
    )
}

const Container = styled.View`
    flex:1;
    background-color: #000000;
`

const StoreHeader = styled.Text`
    color: #ffffff;
    text-align: center;
    margin-top: 42px;
    font-weight: 700;
`

const styles = StyleSheet.create({
    goBackBtn: {
        width: 80,
    }
})

export default StoreContainer;