import React, {
    useState,
    useEffect
  } from 'react';
import { StyleSheet, Text, Button, View , TouchableOpacity, Image, ScrollView} from 'react-native';
// import { Button } from 'react-native-elements';
import {  Header,Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { DataTable } from 'react-native-paper';
import {db, Firebase} from '../../config/firebase'





const AccumulateScreen = ({navigation}) => {

   // console.log(
  //   Firebase.firestore()
  // .collection('accumulate')
  // .add({
  //   diem10: '9.5',
  //   diem4: '3.7',
  //   name: 'HK2 2018-2019',
  //   tcdk: '16',
  //   tctl: '16',
  //   xeploai: 'khá',
  //   user_id: 'vQlPDL7SMxZ1W88JsfGw9eKmusu1',
  //   id: 2,
  //   date: '20:10 11/06/2021'
  // })
  // .then(() => {
  //   console.log('added!');
  // })
  // );

    
    const [diem, setDiem] = useState([]);
    const [loading, setLoading] = useState(false);
    const scoreRef = Firebase.firestore().collection('accumulate');

    useEffect(() => {
        setLoading(true);
        const fetch = scoreRef.where('user_id', '==', Firebase.auth().currentUser?.uid).onSnapshot(querySnapshot => {
        const item = [];
        querySnapshot.forEach((doc)=>{
            const {
            id=doc.user_id,
            name,
            tcdk,
            diem4,
            diem10,
            tctl,
            xeploai
            } = doc.data();
            item.push({
            id,
            name,
            tcdk,
            diem4,
            diem10,
            tctl,
            xeploai
            });
        });
        setDiem(item);
        setLoading(false);
        // console.log(item);
        });
        return fetch;
    }, []);

    return (
        <View style={styles.container}>
            <Text style={{color:'black', fontSize:18, fontWeight:'bold', marginTop:20, marginLeft:10}}>Điểm tích luỹ hiện tại</Text>
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
            <Text style={{color:'black', fontSize:18, fontWeight:'bold', marginBottom:10, marginLeft:10}}>Điểm xếp loại</Text>
            <DataTable>
                <DataTable.Header style={{backgroundColor: '#0083B0', borderTopLeftRadius:8, borderTopRightRadius:8}}>
                <DataTable.Title>Học kỳ</DataTable.Title>
                <DataTable.Title numeric>TC ĐK</DataTable.Title>
                <DataTable.Title numeric>Điểm 4</DataTable.Title>
                <DataTable.Title numeric>Điểm 10</DataTable.Title>
                <DataTable.Title numeric>TC TL</DataTable.Title>
                <DataTable.Title numeric>Xếp Loại</DataTable.Title>
                </DataTable.Header>
                <ScrollView>
                {diem.map((item) => (
                    <>
                <DataTable.Row>
                <DataTable.Cell >{item.name.substring(0,100)+"..."}</DataTable.Cell>
                <DataTable.Cell numeric>{item.tcdk}</DataTable.Cell>
                <DataTable.Cell numeric>{item.diem4}</DataTable.Cell>
                <DataTable.Cell numeric>{item.diem10}</DataTable.Cell>
                <DataTable.Cell numeric>{item.tctl}</DataTable.Cell>
                <DataTable.Cell numeric>{item.xeploai}</DataTable.Cell>
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
            
        </View>
    )
}
export default AccumulateScreen;

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
