import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';

import FormContainer from '../../../Shared/Form/FormContainer';
import Input from '../../../Shared/Form/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { connect } from 'react-redux';

const countries = require("../../../assets/data/countries.json")

const Checkout = (props) => {

    const [ orderItems, setOrderItems ] = useState();
    const [ address, setAddress ] = useState();
    const [ address2, setAddress2 ] = useState();
    const [ city, setCity ] = useState();
    const [ zip, setZip ] = useState();
    const [ country, setCountry ] = useState();
    const [ phone, setPhone ] = useState();
    const [ selected, setSelected ] = useState("");

    useEffect(() => {
        setOrderItems(props.cartItems)

        return () => {
            setOrderItems();
        }
    }, [])

    const checkOut = () => {
        let order = {
            city,
            dateOrdered: Date.now(),
            orderItems,
            phone,
            shippingAddress1: address,
            shippingAddress2: address2,
            zip,
            country
        }
        // passing order object as parameter to Payment screen
        props.navigation.navigate("Payment", {order: order})
    }

    // function to find the object in an array using key value
    function selectedItem(e) {
        return e.key === selected;
    }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
            <FormContainer title={"배송지"}>
                <Input
                    placeholder={"Phone"}
                    name={"phone"}
                    value={phone}
                    keyboardType={"numeric"}
                    onChangeText={(text)=> setPhone(text)}
                />
                <Input
                    placeholder={"Shipping Address 1"}
                    name={"ShippingAddress1"}
                    value={address}
                    onChangeText={(text)=> setAddress(text)}
                />
                <Input
                    placeholder={"Shipping Address 2"}
                    name={"ShippingAddress2"}
                    value={address2}
                    onChangeText={(text)=> setAddress2(text)}
                />
                <Input
                    placeholder={"City"}
                    name={"city"}
                    value={city}
                    onChangeText={(text)=> setCity(text)}
                />
                <Input
                    placeholder={"Zip code"}
                    name={"zip"}
                    value={zip}
                    keyboardType={"numeric"}
                    onChangeText={(text)=> setZip(text)}
                />
                <View style={{widht:'80%', alignItems:"center"}}>
                    <Button title="Next" 
                        onPress={() => checkOut()}
                    />
                </View>
            </FormContainer>
        </KeyboardAwareScrollView>
    )
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    }
}

export default connect(mapStateToProps)(Checkout);