import React, {useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Button, Dimensions } from 'react-native';
import Error from '../../Shared/Error';
import { Text, TextInput } from 'react-native-paper';

// Context
import AuthGlobal from '../../Context/store/AuthGlobal';
import { loginUser } from '../../Context/actions/Auth.actions';

var { width } = Dimensions.get('window');

const Login = (props) => {

    const context = useContext(AuthGlobal)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [text, setText] = useState('');

    // everytime context.stateUser.isAuthenticated changes useEffect will be triggered
    useEffect(() => {
        if(context.stateUser.isAuthenticated === true) {
            props.navigation.navigate("UserProfile")
        }
    }, [context.stateUser.isAuthenticated])

    const handleSubmit = () => {
        const user = {
            email,
            password
        }
        if (email === "" || password === "") {
            setError("Please fill in your credentials")
        } else {
            loginUser(user, context.dispatch)
        }
    }

    return(
        <View style={styles.formContainer}>
            <Text variant="displayMedium" style={styles.formTitle}>로그인</Text>
            <TextInput
                placeholder={"이메일 주소"}
                name={"email"}
                id={"email"}
                value={email}
                onChangeText={(text) => setEmail(text.toLowerCase())}
                style={styles.inputForm}
                mode={'outlined'}
            />
            <TextInput
                placeholder={"비밀번호"}
                name={"password"}
                id={"password"}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.inputForm}
                mode={'outlined'}
            />
            <View style={styles.buttonGroup}>
                {error ? <Error message={error} /> : null}
                <Button title="로그인" onPress={() => handleSubmit()}/>
            </View>
            <View style={[{marginTop:40}, styles.buttonGroup]}>
                <Text style={styles.middleText}>회원가입이 필요한가요?</Text>
                <Button title="회원가입" onPress={() => props.navigation.navigate("Register")}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer:{
        flex:1,
        marginTop: 0,
        padding:30,
        paddingBottom: 70,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor:'#222222',
        color:"#ffffff"
    },
    formTitle:{
        fontSize:20,
        marginBottom:30, textAlign: 'center',
        alignItems: 'center',
        color:"#ffffff"
    },
    inputForm:{
        marginBottom:15,
    },
    buttonGroup: {
      alignItems: "center",
      textAlign: 'center,'
    },
    middleText: {
      marginBottom: 20,
      alignSelf: "center",
      textAlign: 'center,',
      color: "#ffffff"
    },
  });

export default Login;