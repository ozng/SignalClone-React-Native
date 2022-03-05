import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = () => {
        console.log("Login")
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style='light' />
            <Image source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_Signal..png"
            }}
                style={styles.image}
            />
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Email'
                    autoFocus
                    keyboardType='email-address'
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Input
                    placeholder='Password'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
            </View>
            <Button
                containerStyle={styles.btn}
                title="Login"
                onPress={loginHandler}
            />
            <Button
                containerStyle={styles.btn}
                type="outline"
                title="Register"
                onPress={() => navigation.navigate('Register')}
            />
            <View style={{ height: 30 }} />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    image: {
        width: 150,
        height: 150
    },
    inputContainer: {
        width: '80%',

    },
    btn: {
        width: '50%',
        marginTop: 10
    }
})