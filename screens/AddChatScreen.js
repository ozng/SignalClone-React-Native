import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { Button, Icon, Input } from 'react-native-elements'
import { storage } from '../firebase';
import { StatusBar } from 'expo-status-bar';


const AddChatScreen = ({ navigation }) => {
    const [chatName, setChatName] = useState("")

    const createChatHandler = async () => {
        try {
            await storage.collection('chats').add({
                chatName: chatName
            })

            navigation.navigate("Home");
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <Input
                placeholder='Enter a chat name'
                value={chatName}
                onChangeText={text => setChatName(text)}
                leftIcon={() => (
                    <Icon type='antdesign' name='wechat' size={24} color="black" />
                )}
            />
            <Button disabled={!chatName} onPress={createChatHandler} title="Create new chat" />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {

    }
})