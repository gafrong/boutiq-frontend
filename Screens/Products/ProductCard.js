import React from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    Text,
    Button
} from 'react-native';
import Toast from 'react-native-toast-message';

import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
import { Card, Title, Paragraph } from 'react-native-paper';
import BoutiqButton from "../../Shared/StyledComponents/BoutiqButton";

var {width} = Dimensions.get('window');

const ProductCard = (props) => {
    const { name, price, image, countInStock} = props;
    return(
        <View style={styles.container}>
            <Card style={styles.cardCover}>
                <Card.Cover                
                    source={{uri: image? 
                        image : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png"}}
                />
                <Card.Content>
                    <Title style={styles.cardTitle}>
                        {name.length > 15 
                            ? name.substring(0, 15 - 3) + '...' 
                            : name    
                        }
                    </Title>
                    <Text style={styles.cardDescription}>{price}원</Text>
                </Card.Content>
                
                { countInStock > 0 ? (
                    <Card.Actions>
                        <Button 
                            title={"Add"}
                            onPress={()=>{
                                props.addItemToCart(props)
                                Toast.show({
                                    topOffset:60,
                                    type:"success",
                                    text1: `${name} added to Your Cart`,
                                    text2: "Go to your cart to complete order"
                                })
                            }}
                        />
                    </Card.Actions>
                ) : <Text style={{marginTop:20}}>Currently Unavailable</Text>}
            </Card>
        </View>
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
        fontSize: 18
    },
    cardDescription: {
        color: "#ffffff"
    }
})

export default connect(null, mapDispatchToProps)(ProductCard);