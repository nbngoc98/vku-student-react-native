import React, {
  useState,
  useEffect
} from 'react';
import { StyleSheet, Image, SafeAreaView, ScrollView, TextInput, View,FlatList, Button, TouchableOpacity } from "react-native";
import {  SearchBar, Text } from 'react-native-elements'
import {db, Firebase} from '../../config/firebase'
import { Divider} from 'react-native-paper';


const SearchNews = ({navigation}) => {

  const [search, setSearch] = useState('');
  const [masterDataSource, setMasterDataSource] = useState([]);

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const newsRef = Firebase.firestore().collection('news');
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
      // setNews(item);
      setMasterDataSource(item);
      setLoading(false);
      // console.log(item.id);
    });
    return fetch;
    
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setNews(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setNews(masterDataSource);
      setSearch(text);
    }
  };

  // const Item = ({item}) => (
  //         <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('NewsDetailScreen',{id: item.id})}>
  //            <Image  source={{ uri: `${item.image}`}}
  //             style={{ width: '100%', height: 200, }} />
  //           <Text style={{marginLeft:10,fontSize:20, fontWeight:'bold'}}>{item.title.substring(0,50)+"..."}</Text>
  //           <Text style={{marginLeft:10,marginBottom:10}}>Đã đăng ngày {item.day}</Text>
  //           <Divider />
  //         </TouchableOpacity>
  //       );
  const renderItem = ({ item }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('NewsDetailScreen',{id: item.id})}>
      <Image  source={{ uri: `${item.image}`}}
      style={{ width: '100%', height: 200, }} />
    <Text style={{marginLeft:10,fontSize:20, fontWeight:'bold'}}>{item.title.substring(0,50)+"..."}</Text>
    <Text style={{marginLeft:10,marginBottom:10}}>Đã đăng ngày {item.day}</Text>
    <Divider />
  </TouchableOpacity>
      );
  };
  return (
      <SafeAreaView  style={styles.container}>
        <SearchBar
        style={{flex:1}}
        lightTheme
        autoCapitalize='none'
        onChangeText={(text) => searchFilterFunction(text)}
        value={search}
        icon={{ type: 'font-awesome', name: 'search' }}
        placeholder='Tìm kiếm tin tức...' />
      <SafeAreaView style={{flex:1}}>
          <ScrollView style={styles.scrollView}>       
            <FlatList
                data={news}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
          </ScrollView>
      </SafeAreaView>
  </SafeAreaView>
  )
}

export default SearchNews;

const styles = StyleSheet.create({
  contentItem:{

  },
  container: {
    flex:1,
    backgroundColor : '#ffff',
  },
  item:{
    margin:10,
    borderRadius : 2,
    borderWidth: 0.9,
    borderColor: "#d9d9d9",
  }
  });
