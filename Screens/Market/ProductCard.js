import React, {useState, useEffect, useContext} from "react";
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Card, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from "react-redux";
import { setProduct, setVideoProduct } from "../../Redux/state/authSlice";
import AuthGlobal from '../../Context/store/AuthGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../../assets/common/baseUrl';

const ProductCard = (props) => {
    const { id } = props;
    const dispatch = useDispatch();
    const [token, setToken] = useState();
    const context = useContext(AuthGlobal);
    const userAuthenticated = context.stateUser.isAuthenticated;  
    const loggedInUserId = context.stateUser.user.userId;

    const stateProduct = useSelector((state) => state.authReducer.products.find((item) => item._id == id));
    const product = stateProduct;

    let productLikes = {};
    if(product.likes){
        productLikes = product.likes
    }
    const isLiked = Boolean(productLikes[loggedInUserId]);

    useEffect(()=> {
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res)
            })
            .catch((error) => console.log(error))
    }, [])

    const patchProductLike = async () => {
        const response = await fetch(`${baseURL}products/${id}/like`, {
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

    return(
        <View style={styles.container}>
            <Card style={styles.cardCover}>
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
                <Card.Cover                
                    source={{uri: product.image? 
                        product.image : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png"}}
                    style={{zIndex: -1}}
                />
                <Card.Content>
                    <Title style={styles.cardTitle}>
                        {product.name.length > 16 
                            ? product.name.substring(0, 16 - 3) + '...' 
                            : product.name    
                        }
                    </Title>
                    <Text style={styles.cardDescription}>{product.price.toLocaleString()}원</Text>
                </Card.Content>        
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        backgroundColor: "##000",
        margin: 8,
        borderRadius:0
    },
    cardCover: {
        boarderRadius:0,
        overflow:'hidden',
        backgroundColor: "#111111",
    },
    cardTitle: {
        color: "#ffffff",
        fontSize: 13
    },
    cardDescription: {
        color: "#ffffff",
        fontSize: 18,
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

export default ProductCard;