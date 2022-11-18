import React, { useState } from "react";
import { View, SafeAreaView } from 'react-native';
import { Checkbox, List, Text, Button, Title} from 'react-native-paper';

const paymentCards = [
    { value: 'Visa', key: 1},
    { value: 'Master', key: 2},
    { value: 'Other', key: 3}
]

// function to find the object in an array using key value
function selectedItem(e) {
    return e.key === selected;
}

const Payment = (props) => {
    // catch order data passed through params from Checkout
    const order = props.route.params;
    const [ selected, setSelected ] = useState();
    const [ card, setCard ] = useState();
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