import { StyleSheet, Text, View, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar'
import { auth } from '../firebase'
import Colors from '../constants/Colors';

const LoginScreen = ({ navigation }) => {
    const [loading, setIsLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authUser => {
            if (authUser) {
                navigation.replace('Home')
            } else {
                setIsLoading(false)
            }
        })

        return unsubscribe;
    }, [])

    const loginHandler = () => {
        try {
            auth.signInWithEmailAndPassword(email, password)
        } catch (err) {
            alert(err.message)
        }

    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style='light' />
            {
                loading
                    ? (
                        <ActivityIndicator size="large" color={Colors.primary} />
                    )
                    : (
                        <>
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
                                    onSubmitEditing={loginHandler}
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
                        </>
                    )
            }

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