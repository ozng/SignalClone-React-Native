import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { Input, Button, Text } from 'react-native-elements'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../firebase';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [img, setImg] = useState("");

    const registerHandler = async () => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, password)
            const resData = await res.user.updateProfile({
                displayName: name,
                photoURL: img || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            })
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style='light' />

            <Text h3 style={{ marginBottom: 50 }}>Create a Signal account</Text>

            <View style={styles.inputContainer}>
                <Input
                    placeholder='Full Name'
                    autoFocus
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <Input
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Input
                    placeholder='Password'
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <Input
                    placeholder='Profile Picture URL (optional)'
                    value={img}
                    onChangeText={text => setImg(text)}
                    onSubmitEditing={registerHandler}
                />
            </View>

            <Button
                containerStyle={styles.btn}
                raised title="Register"
                onPress={registerHandler}
            />

            <View style={{ height: 25 }} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10
    },
    inputContainer: {
        width: '80%'
    },
    btn: {
        width: '50%'
    }
})