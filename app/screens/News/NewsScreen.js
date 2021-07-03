import React, {
  useState,
  useEffect
} from 'react';
import { Text, StyleSheet, Image, SafeAreaView, ScrollView, TextInput, View,FlatList, Button, TouchableOpacity } from "react-native";
import { Header, Icon } from "react-native-elements";
import { Badge } from 'react-native-elements'
import Slideshow from 'react-native-image-slider-show';
import LinearGradient from 'react-native-linear-gradient';
import { lightGreen100 } from 'react-native-paper/lib/typescript/styles/colors';
import {db, Firebase} from '../../config/firebase'
import { Card, Title, Paragraph } from 'react-native-paper';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';



const NewsScreen = ({navigation}) => {

  const [news, setNews] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const newsRef = Firebase.firestore().collection('news');
  const imagesRef = Firebase.firestore().collection('banner');
  useEffect(() => {
    setLoading(true);
    const fetch = newsRef.onSnapshot(querySnapshot => {
      const item = [];
      querySnapshot.forEach((doc)=>{
        const {
          id,
          title,
          day,
          content,
          image
        } = doc.data();
        item.push({
          id,
          title,
          day,
          content,
          image
        });
      });
      setNews(item);
      setLoading(false);
      // console.log(item.id);
    });
    const fetchImg = imagesRef.onSnapshot(snapshot => {
      setImages(snapshot.docs.map(doc => (
        {data : doc.data()}
      )))
    });
    return fetch, fetchImg;
    
  }, []);
    console.log(images.image);

  const Item = ({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate('NewsDetailScreen',{id: item.id})}>
            <View  style={styles.item2}>
            <View
            style={{
              flexDirection: "row",
              height: 80,
              padding: 10
            }}
          >
            <Text style={{ flex: 1, marginRight: 20,  }}>{item.title.substring(0,85)+"..."}</Text>
            <Image  source={{ uri: `${item.image}`}}
              style={{ width: 100, height: 70 }} />
          </View>
              <View>
                <Text style={{ marginLeft:10}}>{item.day}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
  const renderItem = ({ item }) => {
  return (
      <Item
          item={item} 
      />
      );
  };
  return (
      <View style={styles.container}>
       <Header
      backgroundColor='#0083B0'
        // leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'Tin tức', style: { color: 'white', fontWeight:'bold' } }}
        />
       <View style={{marginTop: 10}}>
       {/* <Slideshow
          // position = '2'
          dataSource={[
            {

              url: 'http://vku.udn.vn/slides/2021/tuanledoanhnghiep.jpg',
            }, {

              url: 'http://vku.udn.vn/slides/2021/lanhsuquan.jpg',
            }, {

              url: 'http://vku.udn.vn/slides/2021/ck-robocar2021.jpg',
            },

          ]} /> */}
      </View>
      <Text style={{ fontSize: 20, height: 30, margin: 20, }}>Tin tức - Sự kiện</Text>
      <View
            style={{
              borderBottomColor: "#0083B0",
              borderBottomWidth: 2
            }}>
      </View> 
      <SafeAreaView style={styles.flatlist}>
      <ScrollView style={styles.scrollView}>       
          <FlatList
              data={news}
              renderItem={renderItem}
              keyExtractor={item => item.id}
          />
          </ScrollView>
      </SafeAreaView>
  </View>
  )
}

export default NewsScreen;

const styles = StyleSheet.create({
  contentItem:{

  },
  container: {
    flex:1,
    backgroundColor : '#ffff',
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
  scrollView: {
      
    },
  logo:{
      flex:0.1,
      alignSelf : 'center',
      width:51,
      height:27
  },
    item2: {
      // alignContent:'center',
      flexDirection: "column",
      // backgroundColor: '#E0E0E0',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius : 10,
      borderWidth: 1,
      borderColor: "gray",
    },
    itemHeader:{
      flexDirection: "row",
      flexWrap: "wrap",
    },
    img:{
      alignSelf: 'center',
      fontSize: 20,
      color:'red',
      marginRight:5
  },
    itemHeader_Center:{
      fontWeight:'bold'
    },
    itemHeader_Right:{
      position: 'absolute', 
      right: 0,
      textAlign: 'right',
      color: '#3A6BEA'
    },
    itemContent:{
      marginLeft:24
    },
  // flatlist: {
  //     // marginTop:20,
  //     marginBottom:20
  // },
  title: {
      fontSize: 12,
    },
  
  logo:{
    resizeMode: 'center',
    width: 50,
    height:30,
},
  });
