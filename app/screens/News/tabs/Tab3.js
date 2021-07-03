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
import {db, Firebase} from '../../../config/firebase';
import { Divider} from 'react-native-paper';



const Tab3 = ({navigation}) => {


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
  const [news, setNews] = useState([]);

  const newsRef = Firebase.firestore().collection('news').where('cate_news', '==', 'vkupress');

  useEffect(() => {
    getNews();
  }, []);

  const getNews= async () => {
    setIsLoading(true);

    const snapshot = await newsRef.orderBy('id','desc').limit(3).get();

    if (!snapshot.empty) {
      let newNews = [];

      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

      for (let i = 0; i < snapshot.docs.length; i++) {
        newNews.push(snapshot.docs[i].data());
      }

      setNews(newNews);
    } else {
      setLastDoc(null);
    }

    setIsLoading(false);
  }

  const getMore = async () => {
    if (lastDoc) {
      setIsMoreLoading(true);

      setTimeout(async() => {
      let snapshot = await newsRef.orderBy('id','desc').startAfter(lastDoc.data().id).limit(3).get();

      if (!snapshot.empty) {
        let newNews = news;

        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

        for(let i = 0; i < snapshot.docs.length; i++) {
          newNews.push(snapshot.docs[i].data());
        }

        setNews(newNews);
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
    return (
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('NewsDetailScreen',{id: item.id})}>
        <Image  source={{ uri: `${item.image}`}}
        style={{ width: '100%', height: 200, }} />
      <Text style={{marginLeft:10,fontSize:20, fontWeight:'bold'}}>{item.title.substring(0,50)+"..."}</Text>
      <Text style={{marginLeft:10,marginBottom:10}}>Đã đăng ngày {item.day}</Text>
      <Divider />
    </TouchableOpacity>
        );
  }

  const onRefresh = () => {
    setTimeout(() => {
      getNews();
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
    <SafeAreaView  style={styles.container}>
      <View style={styles.flatlist}>
          <ScrollView style={styles.scrollView} nestedScrollEnabled>       
            <FlatList 
                style={{marginTop:10}}
                data={news}
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
          </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default Tab3;

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
