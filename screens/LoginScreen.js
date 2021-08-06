import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, View, Text } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';



const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                navigation.replace('Home')
            }
        })
        return unsubscribe
    },[])

    const SignIn = e => {
        auth.signInWithEmailAndPassword(email,password)
        .catch(error=>alert(error))
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Image source={{
                uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"
            }}
                style={{ width: 200, height: 200 }}
            />
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Email"
                    autoFocus 
                    type="email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Input
                    placeholder="Password"
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    onSubmit={SignIn}
                />
            </View>
            {/* <View style={{height:100}}/> */}
            <Button 
                containerStyle={styles.button} 
                onPress={SignIn} 
                title='Login' 
            />
            <Button 
                onPress = {()=>navigation.navigate('Register')}
                containerStyle={styles.button} 
                type="outline" 
                title='Register' 
            />
        </KeyboardAvoidingView>
    );
};

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    inputContainer: {
        width:300,
    },
    button: {
        width:200,
        marginTop:10,
    },

})