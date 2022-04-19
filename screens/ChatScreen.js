import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ScrollView, StatusBar } from 'react-native'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { Avatar } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import { Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import { db, auth } from '../firebase'
import * as firebase from "firebase";



const ChatScreen = ({ navigation, route }) => {

    const [input, setInput] = useState("");
    const  [messagees, setMessagees] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chatt           ",
            headerTitleStyle: { color: "white", alignSelf: 'center' },
            headerStyle: { backgroundColor: "#4775d1" },
            headerTintColor: "white",
            headerBackTitle: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItem: "center",
                        justifyContent: "flex-start",
                        alignItem: "center",

                    }}
                >
                    <Avatar
                        rounded
                        source={{
                            uri:messagees[0]?.data.photoURL ,
                        }}
                    />
                    <Text
                        style={{ color: "white", marginLeft: 10, fontWeight: "700", fontSize: 17 }}
                    >
                        {route.params.chatName}
                    </Text>

                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={navigation.goBack}
                >
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>

            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 50,
                        marginRight: 0
                    }}
                >
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    {/* <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity> */}
                </View>

            )
        });
    }, [navigation,messagees])

    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add
            ({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                displayName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                photoURL: auth.currentUser.photoURL
            })
        setInput('')
    };

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').doc(route.params.id).collection('messages').orderBy('timestamp', 'desc').onSnapshot((snapshot) =>{setMessagees(
            snapshot.docs.map(doc => ({
                key:doc.id,
                id: doc.id,
                data: doc.data(),
            }))
        )})
        return unsubscribe;
    }, [route])


    return (
        <SafeAreaView style={{
            flexDirection: "column-reverse",
            flex: 1,
            backgroundColor: "white"
        }}>
            <StatusBar backgroundColor="#4775d1" barStyle="light-content" />
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView contentContainerStyle={{ paddingTop:151 }}>

                            {
                                messagees.map(({ id, data }) => (
                                    data.email === auth.currentUser.email ? (
                                        <View  key={id} style={styles.reciever}>
                                        
                                            <Avatar
                                                rounded
                                                containerStyle={{
                                                    position:"absolute",
                                                    bottom:-15,
                                                    right:-5,
                                                }}
                                                position="absolute"
                                                bottom={-15}
                                                right={-5}
                                                size={30} 
                                                source={{
                                                    uri:data.photoURL,
                                                }}
                                            />
                                            <Text style={styles.recieverText}>{data.message}</Text>
                                        </View>
                                    ) : (
                                            <View key={id} style={styles.sender}>
                                                 <Avatar
                                                containerStyle={{
                                                    position:"absolute",
                                                    bottom:-15,
                                                    left:-5,
                                                }}
                                                rounded
                                                position="absolute"
                                                bottom={-15}
                                                left={-5}
                                                size={30} 
                                                source={{
                                                    uri:data.photoURL,
                                                }}
                                            />
                                                <Text style={styles.senderText}>{data.message}</Text>
                                                <Text style={styles.senderName}>{data.displayName}</Text>
                                            </View>
                                        )
                                ))
                            }

                        </ScrollView>

                        <View style={styles.footer}>
                            <TextInput
                                value={input}
                                onChangeText={(text) => setInput(text)}
                                onSubmitEditing={sendMessage}
                                placeholder="Signal Message"
                                style={styles.textInput}
                            />
                            <TouchableOpacity
                                onPress={sendMessage} activeOpacity={0.5}
                            >
                                <Ionicons name="send" size={24} color="#4775d1" />
                            </TouchableOpacity>
                        </View>

                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: "transparent",
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30,
    },
    reciever: {
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    sender: {
        paddingTop: 10,
        paddingRight: 10,
        paddingLeft: 15,
        backgroundColor: "#ebf0fa",
        alignSelf: "flex-start",
        borderRadius: 20,
        marginLeft:15,
        marginBottom:20,
        maxWidth: "80%",
        position: "relative",
    },
    senderName:{
        left:10,
        paddingLeft:5,
        paddingBottom:15,
        fontSize:12,
        color:"grey",
        marginRight:10
    },
    senderText: {
        fontWeight:"500",
        color:"grey",
        marginBottom:15,
        marginLeft:10,
        
    },
    recieverText: {
        fontWeight:"500",
        color:"black",
        marginBottom:15,
        marginRight:10,
    },
})
