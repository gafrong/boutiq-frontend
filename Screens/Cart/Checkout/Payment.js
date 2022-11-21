import React, { useState } from "react";
import { View, SafeAreaView } from 'react-native';
import { Checkbox, List, Text, Button, Title} from 'react-native-paper';

const paymentCards = [
    { value: 'Visa', key: 1},
    { value: 'Master', key: 2},
    { value: 'Other', key: 3}
]

const Payment = (props) => {
    // catch order data passed through params from Checkout
    const order = props.route.params;

    return(
        <SafeAreaView>
            <View>
                <Text>Hello card</Text>
                <View>
                    <Button
                        title={"Confirm"}
                        onPress={()=> props.navigation.navigate("Confirm", {order})}
                    >Confirm</Button>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Payment;