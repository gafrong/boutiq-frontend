import React from "react";
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

const StoreProductCard = ({item, navigation}) => {
    // const products = props.route.params.videoProps.videoItems;
// console.log('CARD PROPS', props.route.params.videoProps.videoItems)
// console.log('ITEM', navigation)

    const productImage = item.product.image;
    const productName = item.product.name;
    const productDescription = item.product.description;
    const productPrice = item.product.price;
    return (
        <TouchableOpacity
            onPress={()=>
                navigation.navigate("ProductDetail", item)
            }
        >
            <Card style={styles.card}>
                <Card.Cover source={{ uri: productImage }} />
                <Card.Content style={styles.whiteText}>
                    <Title style={styles.title}>{productName}</Title>
                    <Paragraph style={styles.whiteText}>{productPrice}</Paragraph>
                    <Paragraph style={styles.whiteText}>{productDescription}</Paragraph>
                </Card.Content>
                <Card.Actions>
                <Button>Like</Button>
                <Button>Add</Button>
                </Card.Actions>
            </Card>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card : {
        width: 250,
        backgroundColor: "#222222",
        color: "#ffffff",
        marginLeft:20,
    },
    whiteText : {
        color: "#ffffff"
    },
    title: {
        color: "#ffffff"
    }
})

export default StoreProductCard;