import React, {useState} from 'react'
import {TouchableOpacity, View, Text, StyleSheet, ScrollView, TextInput, SafeAreaView, Dimensions} from 'react-native';

var { width } = Dimensions.get('window');

const Comments = () => {
    const [text, onChangeText] = useState("Useless Text");
    const [number, onChangeNumber] = useState(null);
    const [isShowing, setIsShowing] = useState(false);
    return (
        <> 
            <View style={{}}>
                <ScrollView style={styles.commentArea} contentContainerStyle={{flex:1}}>
                    <Text style={styles.white}>This is the comments testing area</Text>
                    <Text style={styles.white}>This is the comments testing area</Text>
                    <Text style={styles.white}>This is the comments testing area</Text>
                </ScrollView>
                
                <View style={{justifyContent: 'flex-end'}}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeNumber}
                        value={number}
                        placeholder="useless placeholder"
                        keyboardType="numeric"
                    />
                </View>
                
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    commentArea:{
        flex: 1,
        height: "100%"
    },
    white: {
        color: '#fff'
    },
    inputArea:{
        color: '#000',
        backgroundColor: '#555',
        height: 100,
        position: 'absolute',
        bottom:25, 
        width: width,
        padding: 10
    },
    input: {
        color: '#000',
        backgroundColor: '#999',
        height: 50,
        position: 'absolute',
        padding: 20,
        bottom: 10,
        width: width
    }
})
export default Comments;