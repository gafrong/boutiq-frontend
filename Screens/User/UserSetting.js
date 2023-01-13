import React, {useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'

const UserSetting = (props) => {
    useEffect(() => {
        props.navigation.setOptions({
            title: "설정"
        });
    }, [props.navigation])

    console.log('SETTING', props.route.params.user.stateUser)
    return (
        <View style={styles.container}>
            <Text style={styles.text}>UserSetting</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor:'#222',
        padding: 10
    },
    text: {
        color: '#fff'
    }
})

export default UserSetting;