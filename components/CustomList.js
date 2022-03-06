import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ListItem, Avatar } from 'react-native-elements'

const CustomList = ({ id, chatName, enterChat }) => {
    return (
        <ListItem>
            <Avatar
                rounded
                source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: '700' }}>Youtube chat</ListItem.Title>
                <ListItem.Subtitle ellipsizeMode='tail' numberOfLines={1}>
                    This is a test message
                    This is a test message
                    This is a test message
                    This is a test message
                    This is a test message
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomList

const styles = StyleSheet.create({})