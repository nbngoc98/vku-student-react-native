import { Link } from '@react-navigation/native';
import React, {
  useState,
  useEffect
} from 'react';
import { Platform } from 'react-native';
import { View, Text, FlatList, Alert, Linking } from 'react-native';
import { ListItem, Avatar, SearchBar } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'; 
import {db, Firebase} from '../../../config/firebase'

const Tab1 = () =>{

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);


const [contacts, setContacts] = useState([]);
const [loading, setLoading] = useState(false);
const contactRef = Firebase.firestore().collection('gv');

  const openDial = (item) => {
    if(Platform.OS === 'android'){
      Linking.openURL(`tel:${item.phone}`)
    }else{
      Linking.openURL(`telprompt:${item.phone}`)
    }
  }


useEffect(() => {
  setLoading(true);
  const fetch = contactRef.onSnapshot(querySnapshot => {
    const item = [];
    querySnapshot.forEach((doc)=>{
      const {
        id,
        avatar_url,
        name,
        mail,
        phone
      } = doc.data();
      item.push({
        id,
        avatar_url,
        name,
        mail,
        phone
      });
    });
    setContacts(item);
    setMasterDataSource(item);
    setLoading(false);
  //   console.log(
  //     Firebase.firestore()
  // .collection('gv')
  // .add({
  //   avatar_url: "",
  //   name: "",
  //   mail: "",
  //   phone: " ",
  //   id_gv: ""
  // })
  // .then(() => {
  //   console.log('User added!');
  // }));
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
      const itemData = item.name
        ? item.name.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setContacts(newData);
    setSearch(text);
  } else {
    // Inserted text is blank
    // Update FilteredDataSource with masterDataSource
    setContacts(masterDataSource);
    setSearch(text);
  }
};

const ItemSeparatorView = () => {
  return (
    // Flat List Item Separator
    <View
      style={{
        height: 0.5,
        width: '100%',
        backgroundColor: '#C8C8C8',
      }}
    />
  );
};

const getItem = (item) => {
  console.log(item);
  Alert.alert(
    `${item.name}`,
    `${item.mail} - ${item.phone}`,
    [
      { text: "Huỷ", onPress: () => console.log("OK Huỷ") },
      {
        text: "Gửi Mail",
        onPress: () => {
          Linking.openURL(`mailto:${item.email}`)
        },
      },
      { text: "Gọi điện", onPress: () => openDial(item) }
    ]
  );

};


const renderItem = ({ item }) => (
  <ListItem bottomDivider onPress={() => getItem(item)}
  >
    <Avatar size={60} rounded source={{ uri: item.avatar_url }}/>
    <ListItem.Content>
      <ListItem.Title style={{fontWeight:'bold'}}>Giảng Viên: {item.name.toUpperCase()}</ListItem.Title>
      <ListItem.Subtitle>Email: {item.mail}</ListItem.Subtitle>
      <ListItem.Subtitle>Phone: {item.phone}</ListItem.Subtitle>
    </ListItem.Content>
    <ListItem.Chevron />
  </ListItem>
)

const keyExtractor = (item, index) => index.toString()


  return (
    <View>
      <SearchBar
        lightTheme
        autoCapitalize='none'
        onChangeText={(text) => searchFilterFunction(text)}
          // onClear={(text) => searchFilterFunction('')}
          value={search}
        icon={{ type: 'font-awesome', name: 'search' }}
        placeholder='Tìm kiếm Giảng Viên...' />
        <FlatList
                extraData={contacts}
                data={contacts}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemSeparatorView}
                keyExtractor={keyExtractor}
                
            />
    </View>
    
  )

}
export default Tab1;