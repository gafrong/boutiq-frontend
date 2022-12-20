import React, {useEffect, useCallback} from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Feather'
import styled from "styled-components";
import { Button } from 'react-native-paper';
import StoreProfile from "./StoreProfile";
import StoreProductList from './StoreProductList';
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { setProducts } from "../../Redux/Reducers/productSlice";

const StoreContainer = (props) => {
    const dispatch = useDispatch();
    const vendorProfile = props.route.params.createdBy;
    const products = useSelector((state) => state.stateProducts.videoProducts);
    const vendor = useSelector((state) => state.vendors.vendor)
    const storeId = vendorProfile._id
    
    useFocusEffect((
        useCallback(
            () => {
                // Products from database
                axios
                    .get(`${baseURL}products/admin/${storeId}`)
                    .then((res) => {
                        dispatch(setProducts({products:res.data}))
                    })
                    .catch((error) => {
                        console.log('Server error msg',error.message)
                    })

                return () => {

                }
            },
            [],
        )
    ))

    useEffect(() => {
        props.navigation.setOptions({
            title: '@'+vendor.username
        });
    }, [vendor.username, props.navigation])

    return(        
        <Container>
            <ScrollView>
                <StoreProfile 
                    {...props}
                />
                <ProductContainer>
                    <VideoProductTitle>영상 아이템</VideoProductTitle>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {products.map((item, index) => 
                            <StoreProductList 
                                navigation={props.navigation}
                                key={index}
                                item={item}
                            />)}
                    
                        <TouchableOpacity style={[styles.card, styles.lastCard]}>
                            <Button 
                                color="tomato"
                                dark
                                mode={'contained'}
                                onPress={()=> props.navigation.navigate('StoreProfilePage', vendorProfile)}
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
    margin-top: 33px;
    padding-bottom: 4px;
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
        marginTop: 16,
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