import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, TextInput, View , TouchableOpacity, Image,SafeAreaView} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Slideshow from 'react-native-image-slider-show';
import LinearGradient from 'react-native-linear-gradient';
import {db, Firebase} from '../config/firebase'



const HomeScreen = ({navigation}) => {
    const [banners, setBanners] = useState([])
    const bannerRef = Firebase.firestore().collection('banner');
    const [users, setUsers] = useState([])
    const userRef = Firebase.firestore().collection('student');
    useEffect(() => {
      const fetch = bannerRef.onSnapshot(snapshot => {
        const item = [];
        setBanners(snapshot.docs.map(doc => (doc.data())))
      });
      const fetchUser = userRef.where('email', '==', Firebase.auth().currentUser?.email).onSnapshot(snapshot => {
        const item = [];
        setUsers(snapshot.docs.map(doc => ({
          id : doc.id,
          data : doc.data()
        })))
      });
      return fetch, fetchUser;
   }, [])
    
    return (
        <SafeAreaView style={styles.container}>
            {users.map(user => (
            <>
                <LinearGradient colors={['#00B4DB', '#0083B0']} style={styles.header}>
                    <Text style={styles.textHeader} >Xin chào, {user.data.name}</Text>
                </LinearGradient>
            </>
            ))}
        
        <View style={styles.center}>
            <View style={styles.bntCenter}>
                <TouchableOpacity 
                    style={styles.buttonCenter}
                    onPress={() => navigation.navigate('TimeTable')}
                >
                    <Icon 
                        style={styles.iconCenter}
                        name='calendar-alt'
                    />
                    <Text  style={styles.textCenter} >Thời khoá biểu</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bntCenter}>
                <TouchableOpacity 
                    style={styles.buttonCenter}
                    onPress={() => navigation.navigate('Transcript')}
                >
                    <Icon 
                        style={styles.iconCenter}
                        name='list-alt'
                        
                    />
                    <Text  style={styles.textCenter} >Kết quả học tập</Text>
                </TouchableOpacity>
            </View>
        </View>


        <View style={styles.content}>
            <View style={styles.contentItem}>
                {/* <View style={styles.bntContent}>
                    <TouchableOpacity style={styles.buttonContent}>

                        <Icon 
                            style={[styles.iconContent,{backgroundColor:'#ED2F68'}]}
                            name='user'
                        />
                        <Text  style={styles.textContent} >Thông báo</Text>
                    </TouchableOpacity>
                </View> */}
                {/* <View style={styles.bntContent}>
                    <TouchableOpacity style={styles.buttonContent}>

                        <Icon 
                            style={[styles.iconContent,{backgroundColor:'#DF61B4'}]}
                            name='user'
                        />
                        <Text  style={styles.textContent} >Điểm danh</Text>
                    </TouchableOpacity>
                </View> */}
                <View style={styles.bntContent}>
                    <TouchableOpacity style={styles.buttonContent}>
                        <Icon 
                            style={[styles.iconContent,{backgroundColor:'#50C2C9'}]}
                            name='list-alt'
                        />
                        <Text  style={styles.textContent} >Điểm rèn luyện</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bntContent}>
                    <TouchableOpacity style={styles.buttonContent}
                        onPress={() => navigation.navigate('Accumulate')}
                    >
                        <Icon 
                            style={[styles.iconContent,{backgroundColor:'#0081A7'}]}
                            name='check-double'
                        />
                        <Text  style={styles.textContent} >Diểm tích luỹ</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bntContent}>
                    <TouchableOpacity style={styles.buttonContent}
                        onPress={() => navigation.navigate('ContactScreen')}
                    >
                        <Icon 
                            style={[styles.iconContent,{backgroundColor:'#9A99A2'}]}
                            name='phone'
                        />
                        <Text  style={styles.textContent} >Liên hệ</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bntContent}>
                    <TouchableOpacity style={styles.buttonContent}>

                        <Icon 
                            style={[styles.iconContent,{backgroundColor:'#F4BB28'}]}
                            name='calendar'
                        />
                        <Text  style={styles.textContent} >TKB toàn khoá</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        {banners.map((banner) => (
            
            <>
            <View style={styles.footer}>
            <Image style={styles.slider} source={{uri: `${banner.image}`}}/>
            </View>
            </>
        ))}
        
    </SafeAreaView>
    )
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },

    header:{
        flex:4,
        backgroundColor:'#FF5C00',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    textHeader :{
        fontSize:20,
        marginTop: 30,
        marginLeft: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    center:{
        flex:3,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems:"center"
    },
    bntCenter:{
        flex: 1,
        padding:10,
        
    },
    buttonCenter:{
        padding:20,
        alignItems: "center",
        backgroundColor: "white",
        marginTop : -50,
        borderRadius:7,
        paddingTop:45,
        paddingBottom:45,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 12,
    },
    iconCenter:{
        fontSize: 35,
        color: '#0083B0'
    },
    textCenter:{
        fontSize: 18,
        color: '#0083B0',
        fontWeight:'bold'
    },
   

    content:{
        flex:2,
        
    },
    contentItem:{
        flex:1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems:'center'
    },
    bntContent:{
        flex: 1,
        padding:5,
    },
    buttonContent:{
        padding:5,
        alignItems: 'center',
        backgroundColor: "white",
        borderRadius:7,
    },
    iconContent:{
        
        fontSize: 35,
        color: 'white',
        padding:8,
        borderRadius: 5,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    textContent:{
        fontSize: 10,
        color: 'black',
        fontWeight:'bold',
        alignItems: 'center',
        alignContent:'center'
    },
    footer:{
        flex:5,
        padding:20
    },
    slider:{
        marginTop: 20,
        padding:20,
        width: 355,
        height: 200,
        resizeMode: "cover",
    },
});
