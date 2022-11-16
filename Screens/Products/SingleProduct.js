import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text, ScrollView } from 'react-native';
import { Card, Button, Title, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import BoutiqButton from '../../Shared/StyledComponents/BoutiqButton';
import TrafficLight from '../../Shared/StyledComponents/TrafficLight';

//redux
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';

const SingleProduct = (props) => {

    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState('');
    const [availabilityText, setAvailabilityText] = useState("");

    useEffect(() => {
        if(props.route.params.item.countInStock == 0) {
            setAvailability(<TrafficLight unavailable></TrafficLight>);
            setAvailabilityText("Unavailable")
        } else if (props.route.params.item.countInStock <= 5) {
            setAvailability(<TrafficLight limited></TrafficLight>);
            setAvailabilityText("Limited Stock Available")
        } else {
            setAvailability(<TrafficLight available></TrafficLight>);
            setAvailabilityText("Available")
        }

        return () => {
            setAvailability(null);
            setAvailabilityText("");
        }
    }, [])


    return (
        <Card>
            <ScrollView>
        
            <View>
                <Image
                    source={{
                        uri: item.image ? 
                        item.image : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png"
                    }}
                    resizeMode="contain"
                    style={styles.image}
                /> 
            </View>
            <Card.Content style={styles.contentContainer}>
                <Title style={styles.contentHeader}>{item.name}</Title>
                <Text>{item.brand}</Text>
                <Paragraph style={styles.contentText}>{item.description}</Paragraph>
            </Card.Content>
            <View style={styles.availabilityContainer}>
                <View style={styles.availability}>
                    <Text style={{marginRight:10}}>
                        {availabilityText}
                    </Text>
                    {availability}
                </View>
            </View>
           
         
                    <Text style={styles.price}>${item.price}</Text>
                    <Button
                        mode="outlined"
                        uppercase
                        onPress={()=>{ props.addItemToCart(item),
                            Toast.show({
                                topOffset: 60,
                                type: "success",
                                text1: `${item.name} added to your cart`,
                                text2: "Go to your cart to complete the order"
                            })
                        }}
                    >Add</Button>
            
        </ScrollView>
       </Card> 
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
    container: {
        position: 'relative',
        height: '100%'
    },
    scrollView: {
        marginBottom: 80,
        padding: 5
    },
    imageContainer: {
        backgroundColor: 'white',
        margin: 0
    },
    image: {
        width: '100%',
        height: 250
    },
    center: {
        textAlign: 'center'
    },
    contentContainer: {

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
        margin: 20,
        color: 'red'
    },
    availabilityContainer: {
        marginBottom: 20,
        alignItems: "center"
    },
    availability: {
        flexDirection: 'row',
        marginBottom: 10,
    }
})

export default connect(null, mapDispatchToProps)(SingleProduct);