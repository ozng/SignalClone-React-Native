import { useLayoutEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Avatar } from 'react-native-elements'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

import CustomList from '../components/CustomList'
import { auth } from '../firebase'

const HomeScreen = ({ navigation }) => {

    const signOutHandler = async () => {
        try {
            const res = await auth.signOut()
            navigation.replace('Login')
        } catch (err) {
            alert(err.message)
        }

    }

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
                <View style={{ marginLeft: 20 }} >
                    <TouchableOpacity activeOpacity={0.5} onPress={signOutHandler}>
                        <Avatar
                            source={{ uri: auth?.currentUser?.photoURL }}
                            rounded
                        />
                    </TouchableOpacity>
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
                        <AntDesign name='camerao' size={24} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AddChat')} activeOpacity={0.5}>
                        <SimpleLineIcons name='pencil' size={24} color='black' />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])


    return (
        <SafeAreaView>
            <ScrollView>
                <StatusBar style='dark' />
                <CustomList />
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})