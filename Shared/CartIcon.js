import React from "react";
import { StyleSheet } from "react-native";
import { Badge, Text } from "react-native-paper";

import { connect } from 'react-redux';

// Second, show the count of items in cart as an icon
const CartIcon = (props) => {
    return (
        <>
            {props.cartItems.length 
                ? (
                    <Badge style={styles.badge}>
                        <Text style={styles.text}>{props.cartItems.length}</Text>
                    </Badge>) 
                : null
            }
        </>
    )

}

// First map the state to props 
const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems
    }
}

const styles = StyleSheet.create({
    badge: {
        width: 22,
        height: 22,
        position: "absolute",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        top: -4,
        right: -15,
      },
      text: {
        color: "white",
        fontSize: 12,
        width: 100,
        fontWeight: "bold"
      },
})

// Third, connect our mapStateToProps with CartIcon and export
export default connect(mapStateToProps)(CartIcon);