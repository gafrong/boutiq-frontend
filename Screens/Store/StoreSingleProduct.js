import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Button, Title, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import BoutiqButton from '../../Shared/StyledComponents/BoutiqButton';
import TrafficLight from '../../Shared/StyledComponents/TrafficLight';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import AuthGlobal from '../../Context/store/AuthGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../../assets/common/baseUrl';

//redux
import { connect, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
import { setVideoProduct, setProduct } from '../../Redux/Reducers/productSlice';

const StoreSingleProduct = (props) => {
    const [availability, setAvailability] = useState('');
    const [availabilityText, setAvailabilityText] = useState("");
    const productId = props.route.params.product._id;
    const stateProduct = useSelector((state) => state.stateProducts.products.filter((item) => item._id == productId));

    const product = stateProduct[0];

    const dispatch = useDispatch();
    const context = useContext(AuthGlobal);
    const [token, setToken] = useState();

    const userAuthenticated = context.stateUser.isAuthenticated;
    const productLikes = product.likes;
    const loggedInUserId = context.stateUser.user.userId;
    const isLiked = Boolean(productLikes[loggedInUserId]);

    useEffect(() => {
        AsyncStorage.getItem("jwt")
        .then((res) => {
            setToken(res)
        })
        .catch((error) => console.log(error))
        
        if(props.route.params.product.countInStock == 0) {
            setAvailability(<TrafficLight unavailable></TrafficLight>);
            setAvailabilityText("Unavailable")
        } else if (props.route.params.product.countInStock <= 5) {
            setAvailability(<TrafficLight limited></TrafficLight>);
            setAvailabilityText("Limited Stock Available")
        } else {
            setAvailability(<TrafficLight available></TrafficLight>);
            setAvailabilityText("판매중")
        }

        return () => {
            setAvailability(null);
            setAvailabilityText("");
        }
    }, [])

    useEffect(() => {
        props.navigation.setOptions({
            title: product.name
        });
    }, [product.name, props.navigation])

    const patchProductLike = async () => {
        const response = await fetch(`${baseURL}products/${productId}/like`, {
            method: "PATCH",
            headers : {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({userId: loggedInUserId}),
        })
        const updatedProduct = await response.json();
        dispatch(setVideoProduct({product: updatedProduct}));
        dispatch(setProduct({product: updatedProduct}));
    };

    return (
        <View style={{backgroundColor: '#000000'}}>
            <ScrollView>
                <View style={styles.container}>
                    <Card style={styles.card}>
                        {userAuthenticated 
                            ? <TouchableOpacity onPress={()=> patchProductLike()}>
                                <View style={styles.likeBtn}>
                                    {isLiked 
                                    ? <Icon 
                                        name="cards-heart" 
                                        size={30} 
                                        color={'red'}/>
                                    : <Icon 
                                        name="cards-heart-outline" 
                                        size={30} 
                                        color={"#ffffff"}/> }
                                </View>
                            </TouchableOpacity>
                            : <TouchableOpacity onPress={()=> alert('Please login')}>
                                <View style={styles.likeBtn}>
                                    <Icon 
                                        name="cards-heart-outline" 
                                        size={30} 
                                        color={"#ffffff"}/>
                                </View>
                            </TouchableOpacity>
                        }
                        <Card.Cover
                            source={{
                                uri: product.image ? 
                                product.image : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png"
                            }}
                            style={styles.image}
                        /> 
                        <Card.Content style={styles.contentContainer}>
                            <Title style={styles.contentHeader}>{product.name}</Title>
                            <View style={styles.subHeader}>
                                <Text style={styles.contentBrand}>{product.brand}</Text>
                                <Text style={styles.price}>{product.price.toLocaleString()}원</Text>
                            </View>
                            <Paragraph style={styles.contentText}>{product.description}</Paragraph>  
                            <View style={styles.availabilityContainer}>
                                <View style={styles.availability}>
                                    <Text style={[styles.contentText,{marginRight:10}]}>
                                        {availabilityText}
                                    </Text>
                                    {availability}
                                </View>
                            </View>         
                            
                        </Card.Content>       
                    </Card> 
                </View>
            </ScrollView>
            <View style={styles.buyArea}>
                <BoutiqButton
                    large
                    secondary
                    onPress={()=>{ props.addItemToCart(product),
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: `${product.name} added to your cart`,
                            text2: "Go to your cart to complete the order"
                        })
                    }}
                    style={{width: '20%'}}
                ><Text style={{color: '#000000'}}>장바구니</Text></BoutiqButton>
                <BoutiqButton
                    large
                    primary
                    onPress={()=>{ alert('BUY')
                    }}
                    style={{width: '60%'}}
                ><Text style={{color: '#ffffff', fontSize: 18}}>바로구매</Text></BoutiqButton>
            </View>
            
        </View>
       
    )
}

// dispatch our actions to the state container
const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) =>
            dispatch(actions.addToCart({quantity: 1, product}))
    }
}

const styles = StyleSheet.create({
    goBackBtn:{
        position: 'absolute',
        left: -5,
        top: 0,
        width: 30,
        height: 50,
        zIndex: 1,
        elevation: 1
    },
    container: {
        position: 'relative',
        height: '100%',
        flex: 1,
        backgroundColor: '#000000',
        color: '#ffffff',
        paddingTop: 0
    },
    card: {
        marginTop: 20,
        paddingBottom: 100,
        backgroundColor: '#222222'
    },
    contentContainer: {
        backgroundColor: '#222222',
        paddingTop: 10,
        paddingBottom: 10
    },
    subHeader: {
        flexDirection: 'row',
        marginTop: 10,
    },
    imageContainer: {
        backgroundColor: 'white',
        margin: 0
    },
    image: {
        width: '100%',
        height: 250,
        zIndex: -1
    },
    center: {
        textAlign: 'center'
    },
    contentHeader: {
        color: '#ffffff',
        marginBottom: 10,
        fontSize: 20
    }, 
    contentBrand: {
        color: '#ffffff',
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 14
    }, 
    contentText: {
        color: '#ffffff',
        paddingBottom: 15,
        marginTop: 15,
    },  
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white'
    },
    price: {
        fontsize: 30,
        color: 'tomato',
        fontWeight: 'bold',
        fontSize: 18,
        right: 5,
        position: 'absolute'
    },
    availabilityContainer: {
        marginBottom: 20,
        alignItems: "center"
    },
    availability: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    buyArea: {
        flex: 1,
        flexDirection: "row",
        flexWrap: 'wrap',
        alignItems: 'stretch',
        position: 'absolute',
        bottom: 49,  
        backgroundColor: '#000',
        width: '100%',
        height: 60,
        padding: 5
    },
    likeBtn: {
        position: 'absolute',
        right: 10,
        top: 10
    }
})

export default connect(null, mapDispatchToProps)(StoreSingleProduct);