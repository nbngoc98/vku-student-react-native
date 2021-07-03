import React, {
    useState,
    useEffect
  } from 'react';
import { StyleSheet, Text, Button, View , TouchableOpacity, Image, ScrollView, SafeAreaView} from 'react-native';
import {  SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { DataTable } from 'react-native-paper';
import {db, Firebase} from '../../config/firebase'





const TranscriptScreen = ({navigation}) => {
    const [diem, setDiem] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [masterDataSource, setMasterDataSource] = useState([]);
    const scoreRef = Firebase.firestore().collection('score');

   


    useEffect(() => {
        setLoading(true);
        const fetch = scoreRef.where('user_id', '==', Firebase.auth().currentUser?.uid).onSnapshot(querySnapshot => {
        const item = [];
        querySnapshot.forEach((doc)=>{
            const {
            id=doc.user_id,
            name,
            chuyencan,
            cuoiky,
            giuaky,
            tongket
            } = doc.data();
            item.push({
            id,
            name,
            chuyencan,
            cuoiky,
            giuaky,
            tongket
            });
        });
        setDiem(item);
        setMasterDataSource(item);
        setLoading(false);
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
          setDiem(newData);
          setSearch(text);
        } else {
          // Inserted text is blank
          // Update FilteredDataSource with masterDataSource
          setDiem(masterDataSource);
          setSearch(text);
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
            placeholder='Hãy nhập môn học...' />
            <View style={styles.score}>
                <View style={styles.singleDay}>
                    <Text style={styles.TextSingleDay}>Điểm hệ số 4</Text>
                    <Text style={styles.number}>2.75</Text>
                </View>
                <View style={styles.singleDay}>
                    <Text style={styles.TextSingleDay}>Điểm hệ số 10</Text>
                    <Text style={styles.number}>8.25</Text>
                </View>
                <View style={styles.singleDay}>
                    <Text style={styles.TextSingleDay}>TC đã đạt</Text>
                    <Text style={styles.number}>125</Text>
                </View>
                <View style={styles.singleDay}>
                    <Text style={styles.TextSingleDay}>TC đã đăng ký</Text>
                    <Text style={styles.number}>125</Text>
                </View>
            </View>
            <View style={styles.table}>

           

            <DataTable>
                <DataTable.Header style={{backgroundColor: '#0083B0', borderTopLeftRadius:8, borderTopRightRadius:8}}>
                <DataTable.Title>Học phần</DataTable.Title>
                <DataTable.Title numeric>CC</DataTable.Title>
                <DataTable.Title numeric>GK</DataTable.Title>
                <DataTable.Title numeric>CK</DataTable.Title>
                <DataTable.Title numeric>TK</DataTable.Title>
                </DataTable.Header>
                <ScrollView>
                {diem.map((item) => (
                    <>
                <DataTable.Row>
                <DataTable.Cell>{item.name}</DataTable.Cell>
                <DataTable.Cell numeric>{item.chuyencan}</DataTable.Cell>
                <DataTable.Cell numeric>{item.giuaky}</DataTable.Cell>
                <DataTable.Cell numeric>{item.cuoiky}</DataTable.Cell>
                <DataTable.Cell numeric>{item.tongket}</DataTable.Cell>
                </DataTable.Row>
                    </>
                ))}
                </ScrollView>
                

                <DataTable.Pagination
                page={1}
                numberOfPages={3}
                onPageChange={page => {
                    console.log(page);
                }}
                label="1-2 of 6"
                />
            </DataTable>
            </View>
            
        </SafeAreaView>
    )
}
export default TranscriptScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    logo:{
        resizeMode: 'center',
        width: 50,
        height:30,
    },
    score:{
        flexDirection: "row",
        marginTop: 20,

    },
    TextSingleDay:{
        // marginTop:10,
        textAlign:'center',
        color: 'white',
        fontSize:14
        
    },
    number:{
        fontSize:18,
        fontWeight: 'bold',
        color:'white'
    },
    singleDay:{
        alignItems:'center',
        backgroundColor:'#FF5C00',
        padding:10,
        marginHorizontal: 10,
        flex: 0.3,
        borderRadius:7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 12,
    },
    table:{
        marginTop:20,
        padding:10,
    },
    head: {  
        height: 40,  
        backgroundColor: '#50C2C9',
        // fontWeight:'bold'
    },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa', },
    row: {  height: 28  },
    text: { textAlign: 'center',}
});
