import React, { useState,useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import {db} from '../firebase'

const AddChatScreen = ({ navigation }) => {

    const [input, setInput] = useState('')

    const createChat= async()=>{
        await db.collection('chats').add({
            chatName:input
        }).then(()=>{
            navigation.goBack()
        }).catch(error => alert(error))
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:'Add a new Chat',
            headerBackTitle:"chats",  //요 title은 웹에서는 안나오고 ios나옴 
        })
    },[])

    return (
        <View style={styles.container}>
            <Input 
                placeholder="Enter a chat name"
                value={input}
                onChangeText={(text)=>setInput(text)}
                //onSubmitEditing={createChat}
                leftIcon={
                    <Icon name="wechat" type="antdesign" size={24} color="orange"/>
                }
            />
            <Button disabled={!input} onPress={createChat} title='Create new Chat' />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    dontainer:{
        backgroundColor:"white",
        padding:30,
        height:"100%",
    },

})
