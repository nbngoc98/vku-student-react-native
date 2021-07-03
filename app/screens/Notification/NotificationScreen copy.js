import React, {
  useState,
  useEffect
} from 'react';
import { StyleSheet,SafeAreaView,ScrollView, Text, TextInput, View,FlatList, Button,Image, TouchableOpacity } from 'react-native';
import { interpolateNode } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {  SearchBar } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import {db, Firebase} from '../../config/firebase';



const NotificationScreen = ({navigation}) => {

  const [search, setSearch] = useState('');
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const notificationsRef = Firebase.firestore().collection('notification');

  // componentWillMount(() => {
    
  // })

  useEffect(() => {
    setLoading(true);
    const fetch = notificationsRef.onSnapshot(querySnapshot => {
      const item = [];
      querySnapshot.forEach((doc)=>{
        const {
          id,
          title,
          date,
          content,
          cate,
        } = doc.data();
        item.push({
          id,
          title,
          date,
          content,
          cate,
        });
      });
      setNotifications(item);
      setMasterDataSource(item);
      setLoading(false);
      // console.log(item);
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
      setNotifications(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setNotifications(masterDataSource);
      setSearch(text);
    }
  };



    const renderItem = ({ item }) => {
      if (item.cate == "Thông Báo Học Bù") {
        return (
          <TouchableOpacity 
          >
            <LinearGradient colors={['#a8ff78', '#78ffd6']}  style={styles.item2}>
              <View style={styles.itemHeader}>
                <Icon style={styles.bell} name ='notifications' />
                <Text style={{fontWeight:'bold'}}>{item.cate}</Text> 
                <Image source={require('../../assets/images/new.gif')}  style={styles.bell}/>
                <Text style={styles.itemHeader_Right}>{item.date}</Text>
              </View>
              <View style={styles.itemContent}>
                <Text>{item.title}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )
      } else if (item.cate == "Thông Báo Nghỉ Học") {
        return (
          <TouchableOpacity 
          >
            <LinearGradient colors={['#FDC830', '#F37335']}  style={styles.item2}>
              <View style={styles.itemHeader}>
                <Icon style={styles.bell} name ='notifications' />
                <Text style={{fontWeight:'bold'}}>{item.cate}</Text>
                <Image source={require('../../assets/images/new.gif')}  style={styles.bell}/>
                <Text style={styles.itemHeader_Right}>{item.date}</Text>
              </View>
              <View style={styles.itemContent}>
                <Text>{item.title}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )
      }else {
        return (
          <TouchableOpacity 
              onPress={() => navigation.navigate('SingleItem', {id: item.id})}
          >
            <LinearGradient colors={['#D3CCE3', '#E9E4F0']}  style={styles.item2}>
              <View style={styles.itemHeader}>
                <Icon style={styles.bell} name ='notifications' />
                <Text style={{fontWeight:'bold', color:'black'}}>{item.cate}</Text>
                <Text style={styles.itemHeader_Right}>{item.date}</Text>
              </View>
              <View style={styles.itemContent}>
                <Text>{item.title.substring(0,80)+"..."}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )
      }
      
    };

    return (
      <SafeAreaView style={styles.container}>

        <SearchBar
        lightTheme
        autoCapitalize='none'
        onChangeText={(text) => searchFilterFunction(text)}
        value={search}
        icon={{ type: 'font-awesome', name: 'search' }}
        placeholder='Tìm kiếm thông báo...' />

        <SafeAreaView style={styles.flatlist}>
        <ScrollView style={styles.scrollView}>
            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            </ScrollView>
        </SafeAreaView>
    </SafeAreaView>
    )
    
}



const styles = StyleSheet.create({
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
        backgroundColor: '#E0E0E0',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius : 10
      },
      itemHeader:{
        flexDirection: "row",
        flexWrap: "wrap",
      },
      bell:{
        alignSelf: 'center',
        fontSize: 20,
        color:'red',
        marginRight:5
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
    flatlist: {
        marginTop:20,
        marginBottom:20
    },
    title: {
        fontSize: 12,
      },
    
    logo:{
      resizeMode: 'center',
      width: 50,
      height:30,
    },
    iconHeader:{
      color:'white',
      fontSize:18
    },
    });
export default NotificationScreen;