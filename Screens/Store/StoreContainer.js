import React from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Feather'
import styled from "styled-components";
import { Button } from 'react-native-paper';
import StoreProfile from "./StoreProfile";
import StoreProducts from './StoreProducts';

const StoreContainer = (props) => {
    return(        
        <Container>
            <ScrollView>
                <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
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
                <StoreHeader>{props.route.params.user.username}</StoreHeader>
                <StoreProfile 
                    user={props.route.params.user}
                    count={props.route.params.count}
                />
                <ProductContainer>
                    <VideoProductTitle>영상 아이템</VideoProductTitle>
                    <StoreProducts />
                </ProductContainer>
                
                
            </ScrollView>
        </Container>
       
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
const ProductContainer = styled.View`
    background-color: #000000;
    width: 98%;
    min-height: 400px;
    margin-top: 20px;
`
const VideoProductTitle = styled.Text`
    color: #ffffff;
    font-size: 14px;
    text-align: center;
    margin: 0 auto;
    padding: 15px;
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