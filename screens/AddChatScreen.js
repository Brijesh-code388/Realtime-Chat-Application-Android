
import React, { useLayoutEffect, useState } from 'react'
import { Button } from 'react-native';
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { db } from '../firebase';

const AddChatScreen = ({ navigation }) => {

    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add new Chat        ",
            headerTitleStyle: { color: "white", alignSelf: 'center' },
        });
    }, [navigation]);

    const createChat = async () => {
        if (!input.trim()) {
            alert('Please Enter Name');
            return;
        }
        else {
            {
                await db.collection('chat').add({
                    chatName: input
                }).then(() => {
                    navigation.goBack();
                }).catch((error) => alert(error));
            }
        }
    }


    return (
        <View style={styles.container}>

            <Input
                placeholder='Enter a chat name' value={input}
                onChangeText={(text) => {
                    setInput(text)
                }}
                underlineColorAndroid="transparent"

                onSubmitEditing={createChat}
                leftIcon={
                    <Icon name="wechat" type="antdesign" size={24} color="black" />
                }
            >

            </Input>

            <View style={{ marginTop: 15 }}>
                <Button
                    style={{ backgroundColor: "#4775d1" }}
                    onPress={createChat}
                    title="Create new Chat" />
            </View>
        </View>
    )
}

export default AddChatScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%"
    },




})
