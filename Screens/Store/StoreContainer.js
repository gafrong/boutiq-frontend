import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Feather'
import styled from "styled-components";
import { Button } from 'react-native-paper';
import StoreProfile from "./StoreProfile";

const StoreContainer = (props) => {
    return(
        <ScrollView>
            <Container>
                <Button
                    size={45}
                    style={styles.goBackBtn} onPress={() => props.navigation.goBack(null)} >
                    <Icon 
                        name="chevron-left"
                        style={{}}
                        color={"#ffffff"}
                        size={32}
                    />
                </Button>
                <StoreHeader>{props.route.params.user.username}</StoreHeader>
                <StoreProfile 
                    user={props.route.params.user}
                    count={props.route.params.count}
                />
            </Container>
        </ScrollView>
    )
}

const Container = styled.View`
    flex:1;
    background-color: #000000;
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
    }
})

export default StoreContainer;