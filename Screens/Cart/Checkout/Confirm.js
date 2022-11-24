import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, Button } from 'react-native';
import { List, Avatar } from 'react-native-paper';

// connect to redux to clear cart later
import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions/cartActions";

import Toast from 'react-native-toast-message';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"
import baseURL from "../../../assets/common/baseUrl";
import AuthGlobal from "../../../Context/store/AuthGlobal";

var { width, height } = Dimensions.get('window');

const Confirm = (props) => {
    const context = useContext(AuthGlobal);
    const [token, setToken] = useState();
    const [productUpdate, setProductUpdate] = useState();
    const finalOrder = props.route.params;

    const finalProductOrder = finalOrder;
 
    useEffect(() => {
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res);
            })
            .catch((error) => console.log(error));

        if(finalOrder){
            getProduct(finalOrder); 
        }
        return () => {
            setProductUpdate();
        }
    }, [props]);

    const getProduct = (x) => {
        const order = x.order.order;
        var products = [];
        if(order){
            order.orderItems.forEach((cart) => {
                products.push({"product":cart.product._id, "quantity": 1});
            })
        }
        finalProductOrder.order.order.orderItems = products;
    }


    const confirmOrder = () => {

        const order = finalProductOrder.order.order;
        order.country = "대한민국";
        order.user = context.stateUser.user.userId;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        axios
        .post(`${baseURL}orders`, order, config)
        .then((res) => {
            if(res.status == 200 || res.status == 201){
                Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "Order Completed",
                    text2:"",
                })
                setTimeout(() => {
                    props.clearCart();
                    //use the StackScreen name ShopCart in CartNavigator to navigate
                    props.navigation.navigate("CompleteMessage");
                }, 500);
            }
        })
        .catch((error) => {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Something went wrong",
                text2:"Please try again",
            })
            console.log(error)
        })

        
    }

    return(
        <ScrollView contentContainerStyle={StyleSheet.container}>
            <View style={styles.titleContainer}>
                     
                { finalOrder && typeof finalOrder?.order?.order !== 'undefined' ?
                    <View>
                        <Text style={{fontSize:20,fontWeight:"bold"}}>Confirm Order</Text>  
                        <View style={{borderWidth:1, borderColor:"orange"}}>
                            <Text style={styles.title}>배송지:</Text>
                            <View style={{ padding: 8}}>
                                <Text>주소: {finalOrder.order.order.shippingAddress1}</Text>
                                <Text>상세주소: {finalOrder.order.order.shippingAddress2}</Text>
                                <Text>도시: {finalOrder.order.order.city}</Text>
                                <Text>우편번호: {finalOrder.order.order.zip}</Text>

                                <Text>연락처: {finalOrder.order.order.phone}</Text>
                            </View>
                            <Text style={styles.title}>Items:</Text>
                            {/* {finalOrder && ( */}
                                <>
                                    {finalOrder.order.order.orderItems.map((x)=>{
                                        return(
                                            <List.Item style={styles.listItem}
                                                key={x.product.name}
                                                title={x.product.name}
                                                left={()=> <Avatar.Image variant="image" source={{uri: x.product.image}}/>}
                                                description={x.product.price}
                                            />
                                        )
                                    })}

                                </> 
                            {/* )}   */}
                        </View>
                        <Button 
                            title={'Place Order'} 
                            onPress={confirmOrder}/>
                    </View>    
                : 
                    <View>
                        <Text>Shipping information is missing. Please start again.</Text>
                    </View>
                }

            </View>
        </ScrollView>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
      clearCart: () => dispatch(actions.clearCart()),
    };
  };
  
  const styles = StyleSheet.create({
    container: {
      height: height,
      padding: 8,
      alignContent: "center",
      backgroundColor: "white",
    },
    titleContainer: {
      justifyContent: "center",
      alignItems: "center",
      margin: 8,
    },
    title: {
      alignSelf: "center",
      margin: 8,
      fontSize: 16,
      fontWeight: "bold",
    },
    listItem: {
      alignItems: "center",
      backgroundColor: "white",
      justifyContent: "center",
      width: width / 1.2,
    },
    body: {
      margin: 10,
      alignItems: "center",
      flexDirection: "row",
    },
  });
  
  export default connect(null, mapDispatchToProps)(Confirm);