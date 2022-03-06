import { useLayoutEffect, useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Avatar } from 'react-native-elements'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

import CustomList from '../components/CustomList'
import { auth, storage } from '../firebase'

const HomeScreen = ({ navigation }) => {
    const [chats, setChats] = useState([])

    const signOutHandler = async () => {
        try {
            await auth.signOut()
            navigation.replace('Login')
        } catch (err) {
            alert(err.message)
        }

    }

    useEffect(() => {
        const unsubscribe = storage.collection('chats').onSnapshot(snapshots => (
            setChats(snapshots.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))

        return unsubscribe;
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerTitleStyle: {
                color: 'black',
            },
            headerStyle: {
                backgroundColor: 'white'
            },
            headerTintColor: 'black',
            headerTitleAlign: 'center',
            headerLeft: () => (
                <View style={{ marginLeft: 5 }} >
                    <TouchableOpacity activeOpacity={0.5} onPress={signOutHandler}>
                        <Avatar
                            source={{ uri: auth?.currentUser?.photoURL }}
                            rounded
                            size={40}
                        />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 5
                }} >
                    <TouchableOpacity style={{ marginRight: 20 }} activeOpacity={0.5}>
                        <AntDesign name='camerao' size={24} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AddChat')} activeOpacity={0.5}>
                        <SimpleLineIcons name='pencil' size={24} color='black' />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
            id, chatName
        })
    }


    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <StatusBar style='dark' />
                {
                    chats.map(({ id, data }) => (
                        <CustomList id={id} chatName={data.chatName} enterChat={enterChat} chatLength={chats.length} />
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white'
    }
})