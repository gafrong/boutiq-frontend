import React from "react";
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

const StoreProducts = (props) => {
    console.log('STORE PRODUCTS', props)
    const products = props.route.params.videoProps;
    return (
        <View style={{flexDirection: 'row'}}>
            <ScrollView 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >   
                <TouchableOpacity
                    onPress={()=>
                        props.navigation.navigate("ProductDetail", products)
                    }
                >
                    <Card style={styles.card}>
                        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                        <Card.Content style={styles.whiteText}>
                            <Title style={styles.title}>Fake Product Name</Title>
                            <Paragraph style={styles.whiteText}>ajskdlf ajskdfla dsjaklsdfjkaljdfklajdfl ajdfskaljdfkls</Paragraph>
                        </Card.Content>
                        <Card.Actions>
                        <Button>Like</Button>
                        <Button>Add</Button>
                        </Card.Actions>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Card style={styles.card}>
                        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                        <Card.Content style={styles.whiteText}>
                            <Title style={styles.title}>Fake Product Name</Title>
                            <Paragraph style={styles.whiteText}>ajskdlf ajskdfla dsjaklsdfjkaljdfklajdfl ajdfskaljdfkls</Paragraph>
                        </Card.Content>
                        <Card.Actions>
                        <Button>Like</Button>
                        <Button>Add</Button>
                        </Card.Actions>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Card style={styles.card}>
                        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                        <Card.Content style={styles.whiteText}>
                            <Title style={styles.title}>Fake Product Name</Title>
                            <Paragraph style={styles.whiteText}>ajskdlf ajskdfla dsjaklsdfjkaljdfklajdfl ajdfskaljdfkls</Paragraph>
                        </Card.Content>
                        <Card.Actions>
                        <Button>Like</Button>
                        <Button>Add</Button>
                        </Card.Actions>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.card, styles.lastCard]}>
                    <Button 
                        color="tomato"
                        dark
                        mode={'contained'}
                        onPress={() => alert('Go to shop')}
                    >Visit Store</Button>       
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        color: "#ffffff",
    },
    card : {
        width: 250,
        backgroundColor: "#222222",
        color: "#ffffff",
        marginLeft:20,
    },
    whiteText : {
        color: "#ffffff"
    },
    lastCard:{
        width: 250,
        backgroundColor: "#222222",
        color: "#ffffff",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        color: '#ffffff',
        paddingTop: 5
    }
})
export default StoreProducts;