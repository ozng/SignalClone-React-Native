import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native'
import { useLayoutEffect, useState, useEffect } from 'react'
import { Avatar } from 'react-native-elements'
import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as firebase from 'firebase'

import { auth, storage } from '../firebase';
import Colors from '../constants/Colors';

const ChatScreen = ({ navigation, route }) => {
    const [message, setMessage] = useState("")
    const [allMessages, setAllMessages] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: false,
            headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.goBack()}>
                    <AntDesign name='arrowleft' size={24} color="white" />
                </TouchableOpacity>
            ),
            headerTitle: () => (
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Avatar
                        rounded
                        source={{ uri: allMessages[0]?.data?.photoURL }}
                    />
                    <Text style={{
                        color: 'white',
                        marginLeft: 10,
                        fontWeight: '700'
                    }}>{route.params.chatName}</Text>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 20
                }} >
                    <TouchableOpacity style={{ marginRight: 20 }} activeOpacity={0.5}>
                        <FontAwesome name='video-camera' size={24} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AddChat')} activeOpacity={0.5}>
                        <Ionicons name='call' size={24} color='white' />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation, allMessages])

    const sendMessageHandler = async () => {
        try {
            storage.collection('chats').doc(route.params.id).collection('messages').add({
                timestamp: firebase.default.firestore.FieldValue.serverTimestamp(),
                message: message,
                displayName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                photoURL: auth.currentUser.photoURL
            })
            setMessage("")
        } catch (err) {
            alert(err.message)
        }
    }

    useEffect(() => {
        const unsubscribe = storage
            .collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => setAllMessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            ))

        return unsubscribe;
    }, [route])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar style='light' />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <>
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <ScrollView style={{ marginTop: 15 }}>
                            {
                                allMessages.map(({ id, data }) => (
                                    data.email === auth.currentUser.email ? (
                                        <View key={id} style={styles.reciever}>
                                            <Avatar bottom={-10} right={-5} position="absolute" size={24} rounded source={{ uri: data.photoURL }} />
                                            <Text style={styles.recieverText}>{data.message}</Text>
                                            <Text style={styles.recieverName}>{data.displayName}</Text>
                                        </View>
                                    ) : (
                                        <View key={id} style={styles.sender}>
                                            <Avatar bottom={-10} left={-5} position="absolute" size={24} rounded source={{ uri: data.photoURL }} />
                                            <Text style={styles.senderText}>{data.message}</Text>
                                            <Text style={styles.senderName}>{data.displayName}</Text>
                                        </View>
                                    )
                                ))
                            }
                        </ScrollView>
                    </TouchableWithoutFeedback>
                    <View style={styles.footer}>
                        <TextInput
                            style={styles.input}
                            value={message}
                            onChangeText={text => setMessage(text)}
                            placeholder="Message"
                            onSubmitEditing={sendMessageHandler}
                        />
                        <TouchableOpacity activeOpacity={0.5} onPress={sendMessageHandler}>
                            <Ionicons name='send' size={24} color={Colors.primary} />
                        </TouchableOpacity>
                    </View>
                </>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
        marginBottom: 10
    },
    input: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: '#ECECEC',
        padding: 10,
        color: 'grey',
        borderRadius: 30
    },
    reciever: {
        padding: 15,
        backgroundColor: '#ECECEC',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative'
    },
    recieverText: {
        color: 'black',
        fontWeight: '500',
        marginRight: 10,
    },
    recieverName: {
        color: 'black',
        marginRight: 10,
        fontSize: 10,
        marginTop: 5,
        textAlign: 'left'
    },
    sender: {
        padding: 15,
        backgroundColor: '#2B68E6',
        alignSelf: 'flex-start',
        borderRadius: 20,
        marginLeft: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative'
    },
    senderText: {
        color: 'white',
        fontWeight: '500',
        marginLeft: 10,
    },
    senderName: {
        color: 'white',
        marginLeft: 10,
        fontSize: 10,
        marginTop: 5,
        textAlign: 'right'
    }
})