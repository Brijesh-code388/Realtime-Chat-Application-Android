import { auth, db } from '../firebase';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements';
import CustomListItem from "../components/CustomListItem";
import { TouchableOpacity } from 'react-native';
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"
import { StatusBar } from 'react-native';


const HomeScreen = ({ navigation }) => {

    const [chat, setChat] = useState([]);

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        })
    }

    useEffect(() => {

        const unsubscribe = db.collection("chat").onSnapshot((snapshot) => (
            setChat(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            })))
        ));
        return unsubscribe;

    }, [])


    useLayoutEffect(() => {
        navigation.setOptions({
            title: "               SIGNAL",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "#4775d1" },
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (


                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate("AddChat") }} activeOpacity={0.5}>
                        <SimpleLineIcons name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                </View>

            )
        });
    }, [navigation]);

    const enterchat = (id, chatName) => {
        navigation.navigate("Chat", {
            id,
            chatName,
        })
    };

    return (

        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor="#4775d1"
                barStyle="light-content"
            />
            <ScrollView>
                {chat.map(({ id, data: { chatName } }) => (
                    <CustomListItem key={id} id={id} chatName={chatName} enterchat={enterchat} />
                ))}
            </ScrollView>
        </SafeAreaView>

    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: "100%",
    }
})
