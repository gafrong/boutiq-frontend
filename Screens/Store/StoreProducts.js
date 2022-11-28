import React from "react";
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const StoreProducts = () => {
    return (
        <View style={{flexDirection: 'row'}}>
            <ScrollView 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <Card style={styles.card}>
                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                    <Card.Content style={styles.whiteText}>
                        <Title style={styles.whiteText}>Fake Product Name</Title>
                        <Paragraph style={styles.whiteText}>ajskdlf ajskdfla dsjaklsdfjkaljdfklajdfl ajdfskaljdfkls</Paragraph>
                    </Card.Content>
                    <Card.Actions>
                    <Button>Like</Button>
                    <Button>Add</Button>
                    </Card.Actions>
                </Card>
                <Card style={styles.card}>
                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                    <Card.Content>
                        <Title style={styles.whiteText}>Fake Product Name</Title>
                        <Paragraph style={styles.whiteText}>ajskdlf ajskdfla dsjaklsdfjkaljdfklajdfl ajdfskaljdfkls</Paragraph>
                    </Card.Content>
                    <Card.Actions>
                    <Button>Like</Button>
                    <Button>Add</Button>
                    </Card.Actions>
                </Card>
                <Card style={styles.card}>
                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                    <Card.Content>
                        <Title style={styles.whiteText}>Fake Product Name</Title>
                        <Paragraph style={styles.whiteText}>ajskdlf ajskdfla dsjaklsdfjkaljdfklajdfl ajdfskaljdfkls</Paragraph>
                    </Card.Content>
                    <Card.Actions>
                    <Button>Like</Button>
                    <Button>Add</Button>
                    </Card.Actions>
                </Card>
                <Card style={[styles.card, styles.lastCard]}>
                    <Button style={{alignItems:"center"}}>Visit Store</Button>       
                </Card>
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
        marginRight:20,
        backgroundColor: "#222222",
        color: "#ffffff"
    },
    whiteText : {
        color: "#ffffff"
    },
    lastCard:{
        justifyContent: "center",
        alignItems: "center",
        height:350
    }
})
export default StoreProducts;