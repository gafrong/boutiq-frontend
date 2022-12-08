import React, {useState} from "react";
import { StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/Feather'
import styled from "styled-components";
import { Button } from 'react-native-paper';
import StoreProfile from "./StoreProfile";
import StoreProductList from './StoreProductList';

const StoreContainer = (props) => {
    // const [products, setProducts] = useState();

    const videoProfile = props.route.params.videoProps;
    const products = props.route.params.videoProps.videoItems
    // console.log('STORE CONTAINER', videoProfile.videoItems)
    return(        
        <Container>
            <ScrollView>
                <TouchableOpacity onPress={() => props.navigation.navigate('Video')}>
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
                <StoreHeader>{videoProfile.createdBy.name}</StoreHeader>
                <StoreProfile 
                    {...props}
                />
                <ProductContainer>
                    <VideoProductTitle>영상 아이템</VideoProductTitle>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {products.map((item) => 
                            <StoreProductList 
                                navigation={props.navigation}
                                key={item._id}
                                item={item}
                            />)}
                    
                        <TouchableOpacity style={[styles.card, styles.lastCard]}>
                            <Button 
                                color="tomato"
                                dark
                                mode={'contained'}
                                onPress={() => alert('Go to shop')}
                            >Visit Store</Button>       
                        </TouchableOpacity>
                    </ScrollView>
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
    margin-top: 30px;
`
const ProductContainer = styled.View`
    background-color: #000000;
    width: 98%;
    min-height: 400px;
    margin-top: 10px;
`
const VideoProductTitle = styled.Text`
    color: #ffffff;
    font-size: 14px;
    text-align: center;
    margin: 0 auto;
    padding-top: 15px;
    padding-bottom: 20px;
`
const styles = StyleSheet.create({
    goBackBtn: {
        margin: 10,
        marginTop: 10,
        width: 30,
        height: 50,
        alignItems: 'center',
        position: 'absolute'
    },
    card : {
        width: 250,
        backgroundColor: "#222222",
        color: "#ffffff",
        marginLeft:20,
    },
    whiteText : {
        color: "#ffffff"
    },
    lastCard:{
        width: 250,
        backgroundColor: "#222222",
        color: "#ffffff",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default StoreContainer;