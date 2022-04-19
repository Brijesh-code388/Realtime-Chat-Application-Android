import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Button } from 'react-native';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Input, Text } from 'react-native-elements';
import { auth } from '../firebase';

const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [imageurl, setImageurl] = useState("");
    const [password, setPassword] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Register           ",
        });
    }, [navigation]);

    
    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageurl || "https://pngimg.com/uploads/avatar/avatar_PNG9.png",
                })
            })
            .catch((error) => alert(error.message));
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            {/* <StatusBar style="light" /> */}
            <Text h3 style={{ marginBottom: 50 }}>
                Create a Signal Account
            </Text>

            <View style={styles.inputContainer}>
                <Input placeholder="Full Name" type="text" autofocus value={name} onChangeText={(text) => {
                    setName(text)
                }} />
                <Input placeholder="Email" type="email" value={email} onChangeText={(text) => {
                    setEmail(text)
                }} />
                <Input placeholder="Password" type="password" secureTextentry value={password} onChangeText={(text) => {
                    setPassword(text) }}onSubmitEditing={register}
                 />
        
                <Input placeholder="Profile picture Url(optional)" type="text" value={imageurl} onChangeText={(text) => {
                setImageurl(text)}} onSubmitEditing={register}
                />
                    
                

            </View>

           
        <View>
            <Button containerStyle={styles.button} raised onPress={register} title="Register" />
        </View>

        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        //justifyContent:"center",
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        width: 350,
    },
    button: {
        width: 200,
        margin: 10,
    },


})
