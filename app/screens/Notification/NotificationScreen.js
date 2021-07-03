import React, {
  useState,
  useEffect
} from 'react';
import { StyleSheet,
  SafeAreaView,
  ScrollView, 
  Text, 
  TextInput, 
  View,
  FlatList, 
  Button,
  Image, 
  TouchableOpacity, 
  RefreshControl, 
  ActivityIndicator,
} from 'react-native';
import { interpolateNode } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {  SearchBar } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import {db, Firebase} from '../../config/firebase';




const NotificationScreen = ({navigation}) => {


  // console.log(
  //   Firebase.firestore()
  // .collection('notification')
  // .add({
  //   title: 'Ada Lovelace',
  //   cate_slug: 'thong-bao-hoc-bu',
  //   id: '',
  //   date: '20:10 11/06/2021'
  // })
  // .then(() => {
  //   console.log('added!');
  // })
  // );


  let onEndReachedCalledDuringMomentum = false;
  
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const notificationsRef = Firebase.firestore().collection('notification');

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications= async () => {
    setIsLoading(true);

    const snapshot = await notificationsRef.orderBy('id','desc').limit(6).get();

    if (!snapshot.empty) {
      let newNotifications = [];

      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

      for (let i = 0; i < snapshot.docs.length; i++) {
        newNotifications.push(snapshot.docs[i].data());
      }

      setNotifications(newNotifications);
    } else {
      setLastDoc(null);
    }

    setIsLoading(false);
  }

  const getMore = async () => {
    if (lastDoc) {
      setIsMoreLoading(true);

      setTimeout(async() => {
      let snapshot = await notificationsRef.orderBy('id','desc').startAfter(lastDoc.data().id).limit(3).get();

      if (!snapshot.empty) {
        let newNotifications = notifications;

        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

        for(let i = 0; i < snapshot.docs.length; i++) {
          newNotifications.push(snapshot.docs[i].data());
        }

        setNotifications(newNotifications);
        if (snapshot.docs.length < 3) setLastDoc(null);
      } else {
        setLastDoc(null);
      }

      setIsMoreLoading(false);
    }, 1000);
    }

    onEndReachedCalledDuringMomentum = true;
  }

  const renderList = ({ item }) => {
    if (item.cate_slug == "thong-bao-hoc-bu") {
      return (
        <TouchableOpacity 
        >
          <LinearGradient colors={['#a8ff78', '#78ffd6']}  style={styles.item2}>
            <View style={styles.itemHeader}>
              <Icon style={styles.bell} name ='notifications' />
              <Text style={{fontWeight:'bold'}}>Thông Báo Học Bù</Text> 
              <Image source={require('../../assets/images/new.gif')}  style={styles.bell}/>
              <Text style={styles.itemHeader_Right}>{item.date}</Text>
            </View>
            <View style={styles.itemContent}>
              <Text>{item.title}</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      )
    } else if (item.cate_slug == "thong-bao-nghi-hoc") {
      return (
        <TouchableOpacity 
        >
          <LinearGradient colors={['#FDC830', '#F37335']}  style={styles.item2}>
            <View style={styles.itemHeader}>
              <Icon style={styles.bell} name ='notifications' />
              <Text style={{fontWeight:'bold'}}>Thông Báo Nghỉ Học</Text>
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
              <Text style={{fontWeight:'bold', color:'black'}}>Thông Báo Chung</Text>
              <Text style={styles.itemHeader_Right}>{item.date}</Text>
            </View>
            <View style={styles.itemContent}>
              <Text>{item.title.substring(0,80)+"..."}</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      )
    }
  }

  const onRefresh = () => {
    setTimeout(() => {
      getNotifications();
    }, 1000);
  }

  const renderFooter = () => {
    if (!isMoreLoading) return true;
    
    return (
      <ActivityIndicator
          size='large'
          color={'#D83E64'}
          style={{ marginBottom: 10 }}
      />
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList 
          data={notifications}
          keyExtractor={item => item.id.toString()}
          renderItem={renderList}
          ListFooterComponent={renderFooter}
          refreshControl={
              <RefreshControl
                  refreshing={isLoading}
                  onRefresh={onRefresh}
              />
          }
          initialNumToRender={3}
          onEndReachedThreshold={0.1}
          onMomentumScrollBegin = {() => {onEndReachedCalledDuringMomentum = false;}}
          onEndReached = {() => {
              if (!onEndReachedCalledDuringMomentum && !isMoreLoading) {
                getMore();
              }
            }
          }
        />
      </View>
    </View>
  );
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



    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 70,
      paddingTop: 20
    },
    headerLogo: {
      width: 30,
      height: 30,
      marginRight: 10
    },
    headerText: {
      fontSize: 28,
      fontWeight: '600',
      color: '#D83E64'
    },
    title: {
      fontWeight: '300',
      fontSize: 26,
      marginVertical: 10,
      marginLeft: 10,
      color: '#333333'
    },
    list: {
      width: '100%',
      flexDirection: 'column',
      paddingHorizontal: 10,
      marginBottom: 20
    },
    listImage: {
      width: '100%',
      height: 200
    },
    listingRatingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10
    },
    name: {
      fontWeight: '500',
      fontSize: 17, 
      color: '#333333'
    },
    rating: {
      fontSize: 13,
      fontWeight: '100',
      color: '#333333'
    },
    budgetTagsContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center'
    },
    budgetTagsText: {
      fontWeight: '100',
      color: '#333333',
      fontSize: 15
    },
    newContainer: {
      position: 'absolute',
      top: 20,
      left: 10,
      backgroundColor: '#D83E64',
      paddingHorizontal: 20,
      paddingVertical: 10
    },
    newText: {
      color: '#FFFFFF',
      fontWeight: '500'
    }
    });
export default NotificationScreen;