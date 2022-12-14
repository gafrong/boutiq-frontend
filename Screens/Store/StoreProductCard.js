import React, {useState, useContext, useEffect} from "react";
import { TouchableOpacity, StyleSheet, Pressable, View, Text } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import AuthGlobal from '../../Context/store/AuthGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../../assets/common/baseUrl';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { setVideoProduct, setProduct } from '../../Redux/state/authSlice';

const StoreProductCard = ({item, navigation}) => {
  
    const dispatch = useDispatch();
    const [token, setToken] = useState();
    const context = useContext(AuthGlobal);
    const userAuthenticated = context.stateUser.isAuthenticated;  
    const loggedInUserId = context.stateUser.user.userId;
 
    const productId = item.product._id;
    const stateProduct = useSelector((state) => state.authReducer.videoProducts.find((item) => item.product._id == productId));
    const product = stateProduct.product;
    const productLikes = product.likes; 
    const isLiked = Boolean(productLikes[loggedInUserId]);

    const test = useSelector((state)=>state.authReducer.videoProducts);
    const productCount = Object.keys(test).length;
    console.log('VIDEO PROD COUNT', productCount);
    useEffect(()=> {
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res)
            })
            .catch((error) => console.log(error))
    }, [])

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
        <TouchableOpacity
            onPress={()=>
                navigation.navigate("StoreProductDetail", {product:product})
            }
        >
            <Card style={styles.card}>
                {userAuthenticated 
                ? <Pressable onPress={()=> patchProductLike()}>
                    <View style={styles.likeBtn}>
                        {isLiked 
                        ? <Icon 
                            name="cards-heart" 
                            size={25} 
                            color={'red'}/>
                        : <Icon 
                            name="cards-heart-outline" 
                            size={25} 
                            color={"#ffffff"}/> }
                    </View>
                </Pressable>
                : <Pressable onPress={()=> alert('Please login')}>
                    <View style={styles.likeBtn}>
                        <Icon 
                            name="cards-heart-outline" 
                            size={25} 
                            color={"#ffffff"}/>
                    </View>
                </Pressable>
                }
                <Card.Cover source={{ uri: product.image }} style={{zIndex: -1}}/>
                
                <Card.Content style={styles.whiteText}>
                    <Title style={styles.title}>
                        {product.name.length > 20 
                            ? product.name.substring(0, 20 - 3) + '...' 
                            : product.name    
                        }
                    </Title>
                    <Paragraph style={styles.price}>{product.price.toLocaleString()}원</Paragraph>
                    <Paragraph style={styles.whiteText}>
                        {product.description.length > 100
                            ? product.description.substring(0, 100 - 3) + '...'
                            : product.description
                        }
                    </Paragraph>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card : {
        width: 250,
        backgroundColor: "#222222",
        color: "#ffffff",
        marginLeft:20,
        flex: 1,
    },
    whiteText : {
        color: "#ffffff"
    },
    price: {
        color: '#ffffff',
        fontSize: 20,
    },  
    title: {
        color: "#ffffff",
        fontSize: 15,
        fontWeight: 'bold',
        paddingTop: 10
    },
    menu: {
        margin: "6px",
        alignItems: "center",
    },
    likeBtn: {
        position: 'absolute',
        zIndex: 1,
        elevation: 1,
        right: 10,
        top: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default StoreProductCard;