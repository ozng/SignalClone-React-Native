import { useState, useEffect } from 'react'
import { ListItem, Avatar } from 'react-native-elements'
import { storage } from '../firebase';

const CustomList = ({ id, chatName, enterChat, chatLength }) => {
    const [chatMessages, setChatMessages] = useState([])

    useEffect(() => {
        const unsubscribe = storage.collection('chats').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
            setChatMessages(snapshot.docs.map(doc => doc.data()))
        ))

        return unsubscribe;
    }, [chatLength])

    return (
        <ListItem onPress={() => enterChat(id, chatName)} key={id} >
            <Avatar
                rounded
                source={{ uri: chatMessages?.[0]?.photoURL || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: '700' }}>{chatName}</ListItem.Title>
                <ListItem.Subtitle ellipsizeMode='tail' numberOfLines={1}>
                    {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomList