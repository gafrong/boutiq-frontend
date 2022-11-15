import React from 'react';
import { Text, View, Dimensions, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
import CartItem from './CartItem';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions'

var { height, width } = Dimensions.get("window");

const ShopCart = (props) => {
    var total = 0;
    // calculate the total of all products in the cart
    props.cartItems.forEach(cart => {
        return (total += cart.product.price)
    });

    return (
        // using react fragment acting as a view without occupying a node to encapsulate some code
        <>
            {props.cartItems.length ? (
                <View style={styles.emptyContainer}>
                    <Text>Your Cart</Text>
                    <SwipeListView
                        data={props.cartItems}
                        renderItem={ data => (
                            <CartItem item={data} />
                        )}
                        renderHiddenItem={(data) => (
                            <View style={styles.hiddenContainer}>
                                <TouchableOpacity 
                                    style={styles.hiddenButton}
                                    onPress={() => props.removeFromCart(data.item)}
                                    >
                                    <Icon name="trash" color={"white"} size={30} />
                                </TouchableOpacity>
                            </View>

                        )}
                        disableRightSwipe={true}
                        previewOpenDelay={3000}
                        friction={1000}
                        tension={40}
                        leftOpenValue={75}
                        stopLeftSwipe={75}
                        rightOpenValue={-75}
                    />
                    <View style={styles.bottomContainer}>
                        <Text style={styles.price}>{total}원</Text>
                        <Button 
                            title="Clear"
                            onPress={ ()=> props.clearCart() }
                            />
                        <Button title="Checkout" 
                            onPress={() => props.navigation.navigate('Checkout')}/>
                    </View>
                </View>
            ): (
                <View style={styles.emptyContainer}>
                    <Text>Looks like your cart is empty</Text>
                    <Text>Add products to your cart to get started</Text>
                </View>
            )}
        </>
    )
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems:cartItems,
    }
}

// import clearCart method that we've created in the Redux store to clear the cart. Use dispatch redux method to do that
const mapDispatchToProps = (dispatch) => {
    return {
        // call our method clearCart and use actions that we've created in Redux folder and use dispatch redux method
        clearCart: () => dispatch(actions.clearCart()),
        removeFromCart: (item) => dispatch(actions.removeFromCart(item))
    }
}

const styles = StyleSheet.create({
    emptyContainer:{
        height: height,
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 140,
        left: 0,
        backgroundColor: 'white',
        elevation: 20,
        width: width
    },
    price: {
        fontSize: 18,
        margin: 20,
        color: 'red'
    },
    hiddenContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      flexDirection: 'row'
    },
    hiddenButton: {
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingRight: 25,
      height: 67,
      width: width / 1.2
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopCart);