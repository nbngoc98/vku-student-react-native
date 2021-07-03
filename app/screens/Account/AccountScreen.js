import React,{useEffect,useState} from 'react'
import { StyleSheet,Text, View,TouchableOpacity,FlatList, Alert } from 'react-native'
import {db, Firebase} from '../../config/firebase'
import {  Header,Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';


const AccountScreen = ({navigation}) => {
    const [users, setUsers] = useState([])
    const userRef = Firebase.firestore().collection('student');
    // Kiểm tra mail users lúc login.
    useEffect(() => {
      const fetch = userRef.where('email', '==', Firebase.auth().currentUser?.email).onSnapshot(snapshot => {
        const item = [];
        setUsers(snapshot.docs.map(doc => ({
          // id : doc.id,
          data : doc.data()
        })))
      });
      return fetch;
   }, [])
  //  console.log(users.docs)
    return (
      <View style={styles.container}>
         {users.map((user) => (
            
            <>
              <View style={styles.avatar}>
                  <Avatar
                      rounded
                      size='xlarge'
                      imageProps={{resizeMode: 'cover'}} 
                      source={{ uri: `${user.data.avatar_url}`}}
                  />
                  
              </View>
          
              <Text style={{fontWeight:'bold', fontSize:20, marginTop:20}}>{user.data.name}</Text>
              <Text>Mail: {user.data.email}</Text>
              <Text style={{fontWeight:'bold', fontSize:15}}>Niên Khoá : {user.data.nienkhoa}</Text>

              <LinearGradient colors={['#00d2ff', '#3a7bd5']}  style={styles.item2}>
                <View style={styles.itemHeader}>
                    <Icon style={styles.bell} name ='class' />
                    <Text style={styles.itemHeader_Center}>Khoa: {user.data.khoa}</Text>
                  </View>
                <View style={styles.itemHeader}>
                  <Icon style={styles.bell} name ='people' />
                  <Text style={styles.itemHeader_Center}>Ngành học: {user.data.nganh}</Text>
                </View>
                <View style={styles.itemHeader}>
                  <Icon style={styles.bell} name ='subtitles' />
                  <Text style={styles.itemHeader_Center}>Mã Sinh Viên: {user.data.msv}</Text>
                </View>
                <View style={styles.itemHeader}>
                  <Icon style={styles.bell} name ='school' />
                  <Text style={styles.itemHeader_Center}>Lớp sinh hoạt: {user.data.class}</Text>
                </View>
                <View style={styles.itemHeader}>
                  <Icon style={styles.bell} name ='smartphone' />
                  <Text style={styles.itemHeader_Center}>Số điện thoại: {user.data.phone}</Text>
                </View>
                <View style={styles.itemHeader}>
                  <Icon style={styles.bell} name ='place' />
                  <Text style={styles.itemHeader_Center}>Quê quán: {user.data.location}</Text>
                </View>
              </LinearGradient>
            </>
          ))}
          

        <TouchableOpacity style={styles.logout} 
                            onPress={()=> {
                              Alert.alert(
                                'Đăng xuất',
                                'Bạn có chắc chắn muốn đăng xuất tài khoản?',
                                [
                                  {
                                    text: 'Huỷ',
                                    onPress: () => {
                                      return null;
                                    },
                                  },
                                  {
                                    text: 'Đồng ý',
                                    onPress: () => {
                                      Firebase.auth().signOut()
                                      // navigation.replace('Login');
                                    },
                                  },
                                ],
                                {cancelable: false},
                              );
                            }} >
                <Icon 
                style={{color:'white', paddingTop:8, fontSize:25}}
                name='logout'
                />
                <Text style={{color:'white', fontSize:16, padding:10}} >
                    Logout 
                </Text>
          </TouchableOpacity>
      </View>
    )
 
}
export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
  },
  iconHeader:{
    color:'white',
    fontSize:18
  },
  avatar:{
    marginTop:70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent:{
    color:'white',
    fontSize:18,
  },
  item2: {
    width:'90%',
    // alignContent:'center',
    flexDirection: "column",
    backgroundColor: '#E0E0E0',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius : 10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 7.68,
    elevation: 12,
  },
  itemHeader:{
    flexDirection: "row",
    flexWrap: "wrap",
  },
  bell:{
    alignSelf: 'center',
    fontSize: 20,
    color:'white',
    marginRight:15
},
  itemHeader_Center:{
    fontWeight:'bold',
    color:'white'
  },
  logout:{
    marginTop:10,
    flexDirection:'row',
    backgroundColor:'#FF5C00',
    borderRadius:20,
    paddingRight:30,
    paddingLeft:30,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 7.68,
    elevation: 12,
  },
})
