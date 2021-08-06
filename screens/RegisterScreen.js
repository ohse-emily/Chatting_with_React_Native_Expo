import React,{useState,useLayoutEffect} from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import {StatusBar} from 'expo-status-bar';
import { Input, Button,Text } from 'react-native-elements';
import {auth} from '../firebase'

const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerBackTitle:'Back to Login',
        })
    },[navigation])

    const register=()=>{
        auth.createUserWithEmailAndPassword(email,password)
        .then(authUser=>{
            authUser.user.updateProfile({
                displayName:name,
                photoURL:imageUrl || "http://www.connectingcouples.us/wp-content/uploads/2019/07/avatar-placeholder.png",
            })
        }).catch(error=>alert(error.message))
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light"/>
            <Text h3 style={{marginBottom:50}}>
                Register
            </Text>
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Full Name"
                    autofocus
                    type="text"
                    value={name}
                    onChangeText={(text)=>setName(text)}
                />
                <Input 
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChangeText={(text)=>setEmail(text)}
                />
                <Input 
                    placeholder="password"
                    type="password"
                    value={password}
                    secureTextEntry
                    onChangeText={(text)=>setPassword(text)}
                />
                <Input 
                    placeholder="Profile Picture URL (Optional)"
                    type="text"
                    value={imageUrl}
                    onChangeText={(text)=>setImageUrl(text)}
                    onSubmitEditing={register} // 마지막 다 입력하면 submit
                />
            </View>
            <Button 
                onPress={register}  // 버튼 눌러도 submit 
                raised
                title="Register"
                containerStyle={styles.button}
                
            />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:'center',
        padding:10,
        backgroundColor:"white",
    },
    inputContainer:{
        width:300,
    },
    button:{
        width:200,
        marginTop:10,
    },

})
