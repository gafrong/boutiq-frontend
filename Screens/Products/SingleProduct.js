import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Button, Title, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import BoutiqButton from '../../Shared/StyledComponents/BoutiqButton';
import TrafficLight from '../../Shared/StyledComponents/TrafficLight';
import Icon from "react-native-vector-icons/Feather";
//redux
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';

const SingleProduct = (props) => {
// console.log('ITEM', props)
    const [item, setItem] = useState(props.route.params.product);
    const [availability, setAvailability] = useState('');
    const [availabilityText, setAvailabilityText] = useState("");

    useEffect(() => {
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


    return (
        <ScrollView>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.goBackBtn}>
                    <Button
                        size={20}
                        >
                        <Icon 
                            name="chevron-left"
                            style={styles.backBtnIcon}
                            color={"#ffffff"}
                            size={32}
                        />
                    </Button>
                </TouchableOpacity>
                <Card style={styles.card}>
                    <Card.Cover
                        source={{
                            uri: item.image ? 
                            item.image : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png"
                        }}
                        style={styles.image}
                    /> 
                    <Card.Content style={styles.contentContainer}>
                        <Title style={styles.contentHeader}>{item.name}</Title>
                        <View style={styles.subHeader}>
                            <Text style={styles.contentBrand}>{item.brand}</Text>
                            <Text style={styles.price}>{item.price}원</Text>
                        </View>
                        <Paragraph style={styles.contentText}>{item.description}</Paragraph>  
                        <View style={styles.availabilityContainer}>
                            <View style={styles.availability}>
                                <Text style={[styles.contentText,{marginRight:10}]}>
                                    {availabilityText}
                                </Text>
                                {availability}
                            </View>
                        </View>         
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
                    </Card.Content>       
                </Card> 
            </View>
        </ScrollView>
       
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
        top: 18,
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
        paddingTop: 50
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
        height: 250
    },
    center: {
        textAlign: 'center'
    },
    contentHeader: {
        color: '#ffffff',
        marginBottom: 10,
        fontSize: 23
    }, 
    contentBrand: {
        color: '#ffffff',
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 16
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
    }
})

export default connect(null, mapDispatchToProps)(SingleProduct);