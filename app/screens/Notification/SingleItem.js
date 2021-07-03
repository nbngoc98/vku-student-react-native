import React, {
    useState,
    useEffect
  } from 'react';
import { StyleSheet,SafeAreaView,ScrollView, Text, TextInput, View,FlatList, Button,Image, TouchableOpacity } from 'react-native';
import { interpolateNode } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {  Header,Avatar } from 'react-native-elements';
import {db, Firebase} from '../../config/firebase'
import HTML from "react-native-render-html";

const NotificationScreen = ({navigation, route}) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const notificationsRef = Firebase.firestore().collection('notification');

    useEffect(() => {
        setLoading(true);
        const fetch = notificationsRef.where('id', '==', route.params.id).onSnapshot(querySnapshot => {
        const item = [];
        querySnapshot.forEach((doc)=>{
            const {
            id,
            title,
            date,
            content,
            } = doc.data();
            item.push({
            id: doc.id,
            title,
            date,
            content,
            });
        });
        setNotifications(item);
        setLoading(false);
        // console.log(item);
        });
        return fetch;
    }, []);
    console.log(route.params);

    return (
        <View style={styles.container}>

            {notifications.map((detail) => (
                <>
                <View style={styles.hightLight}>
                    <Text style={styles.TextHightLight}>{detail.title}</Text>
                </View>
                <View style={styles.luotXem}>
                    <Text style={styles.textLuotXem}>Ngày đăng {detail.date}</Text>
                </View>
                <ScrollView style={styles.content}>
                    <HTML source={{ html: detail.content }} />
                 </ScrollView>
                </>
            ))}
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        
    },
    content:{
        marginTop :10,
        padding:10
    },
    textContent:{
        marginHorizontal:10,
        textAlign:'left',
        margin:'auto',
    },
    luotXem:{
        marginTop :10,
    },
    textLuotXem:{
        color:'black',
        textAlign :'right',
        marginRight:10,
        // fontWeight: 'bold'

    },
    hightLight:{
        marginTop:10,
        marginHorizontal :10,
        alignItems:'center',
        backgroundColor : '#FFA500',
        textAlign: 'center',
        padding:10,
        borderColor: 'red',
        borderLeftWidth:10
    },
    TextHightLight:{
        marginHorizontal :10,
        textAlign: 'center',
        fontWeight :'bold',
        color :'white',
    },
    header:{
        alignContent:'center',
        height:63,
        flexDirection: "row",
        backgroundColor:'#E0E0E0'
    },
    textHeader:{
        flex:0.9,
        color :'#FF5C00',
        textAlign : 'center',
        alignSelf : 'center',
        fontSize: 25,
        fontWeight:'bold'

    },
    logo:{
        resizeMode: 'center',
        width: 50,
        height:30,
    },
    });
export default NotificationScreen;