import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { db } from '../firebase';


const CustomListItem = ({ id, chatName, enterchat }) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('chats').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())));
        return unsubscribe;
    });

    return (
        <ListItem key={id} onPress={() => enterchat(id, chatName)} bottomDivider>
            <Avatar
                rounded
                source={{
                    uri: messages?.[0]?.photoURL
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {messages?.[0]?.displayName}:{messages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );
};

export default CustomListItem

const styles = StyleSheet.create({})
