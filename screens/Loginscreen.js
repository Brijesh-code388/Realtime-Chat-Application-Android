import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button, Input, Image } from "react-native-elements";


const Loginscreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    useEffect(() => {
         const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                console.log(authUser);
                 navigation.replace("Home");
            }
         });
         return unsubscribe;
     },[]);


    const singIn = () => {
        auth
        .signInWithEmailAndPassword(email,password).catch((error)=>alert(error));
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.container}>
                <StatusBar style="light" />
                <Image
                    source={{
                        uri: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Signal_Blue_Icon.png"
                    }}
                    style={{ width: 150, height: 150 }}
                    />
                    <View style={{height:30}}/>

                <View style={styles.inputContainer}>

                    <Input
                        placeholder="Email"
                         type="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <Input
                        placeholder="password"
                        secureTextEntry type="password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>

                <Button containerStyle={styles.button} onPress={singIn} title="Login" />
                <Button onPress={()=>navigation.navigate("Register")}containerStyle={styles.button} type="outline" title="Register" />
                
            </View>
         </KeyboardAvoidingView >
    )
}

export default Loginscreen

const styles = StyleSheet.create({
    inputContainer: {
        width:300,
    },
    button: {
        width :200,
        marginTop:10,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor:"white",

    }
});

