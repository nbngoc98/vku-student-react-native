import React ,{ useState, useEffect}from 'react'
import {db, Firebase}  from '../../config/firebase'
import { StyleSheet,SafeAreaView,ScrollView, Text, TextInput, View,FlatList,Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import {  Header,Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';


const day = [
    {
        id:1,
        name:"T2"
    },
    {
        id:2,
        name:"T3"
    },
    {
        id:3,
        name:"T4"
    },
    {
        id:4,
        name:"T5"
    },
    {
        id:5,
        name:"T6"
    },
    {
        id:6,
        name:"T7"
    },
    {
        id:7,
        name:"CN"
    },
]


const initMonday = [
    
]


const TimeTable = ({navigation}) => {
// export default class TimeTable {
    const [TKB, setTKB] = useState([]);
    const [selectedId, setSelectedId] = useState(1);
    const [ngay, setNgay] = useState();
    const [thang, setThang] = useState();
    const [nam, setNam] = useState();
    const [thu, setThu] = useState();

    var currentdate = new Date(); 
    var datetime = "Lịch học ngày " 
                + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ ";
    var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

    var thungay = weekday[currentdate.getDay()];
    // console.log(thungay);

    const dataCraw = Firebase.firestore().collection('TKB');
    
    useEffect(() => {
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        
        var now = new Date();
        setNgay(now.getDate());
        setThang(now.getMonth());
        setNam(now.getFullYear());
        var date = new Date().getDay();

        var currentDay = days[date];
        setSelectedId(date);
        setThu(date);
        
        const fetch = dataCraw.onSnapshot(querySnapshot => {
            const subject = [];
            querySnapshot.forEach((doc)=>{
              const {
                id,
                day,
                gv,
                mon,
                phong,
                tiet,
              } = doc.data();
              subject.push({
                id,
                day,
                gv,
                mon,
                phong,
                tiet,
              });
            });
            setTKB(subject);
            
          });
          loadData(currentDay);
        },[]);
    
    const [DATA, setDATA] = useState([]);
    
    
    const loadData = (chuoi) =>{
        let monHoc = [];
        TKB.forEach(element => {
            if(element.day == chuoi){
                monHoc.push(element);
            }
                    
        });
        setDATA(monHoc);
        
    }
    
    const Item = ({item}) => (
        

        <TouchableOpacity   
            // onPress={() => navigation.navigate('SingleItem')}
        >
            <LinearGradient colors={['#FDC830', '#F37335']} style={styles.item}>
                <View style={styles.contentItem}>
        
                <Text  style={{
                    fontWeight:'bold',
                    fontSize:17,
                    
                }}>{item.mon}</Text>
                <View style={{flexDirection:'row', marginTop:10}}>
                    <Icon name="science" style={{fontSize:22, fontWeight:'bold', color:'#f2f2f2'}}/>
                    <Text style={{
                        fontSize:15, fontWeight:'bold',color:'#f2f2f2'
                    }}> Tiết học: {item.tiet}</Text>
                </View>
                <View style={{flexDirection:'row', marginTop:2}}>
                    <Icon name="person" style={{fontSize:22, fontWeight:'bold', color:'#f2f2f2'}}/>
                    <Text style={{
                        fontSize:15, fontWeight:'bold',color:'#f2f2f2'
                    }}> Giáo Viên: {item.gv}</Text>
                </View>
                <View style={{flexDirection:'row', marginTop:2}}>
                    <Icon name="home" style={{fontSize:22, fontWeight:'bold', color:'#f2f2f2'}}/>
                    <Text style={{
                        fontSize:15, fontWeight:'bold',color:'#f2f2f2'
                    }}> Phòng học: {item.phong}</Text>
                </View>
                </View>
            </LinearGradient>
            </TouchableOpacity>
    );
          /////EVERY SINGLE DAY IN WEEK
          const Day = ({item, onPress, backgroundColor}) => (
            
            <TouchableOpacity   
                onPress={onPress} style={[styles.singleDay, backgroundColor]}
            >
                    <View style={styles.singleDay}>
                    <Text style={styles.TextSingleDay}>{item.name}</Text>                    
                    </View>
                </TouchableOpacity>
              );
          const renderItem = ({ item }) => {
                if(item !== null){
                    return (
                        <Item
                        item={item} s
                        />
                    );
                }else{
                    console.log(DATA);
                };
        }

        const renderDay = ({ item }) => {
            const backgroundColor = item.id === selectedId ? "#ffa31a" : "#e6f5ff";
            return (
                <Day
                    item={item} 
                    onPress={() => {dayClicked(item);setSelectedId(item.id);}}
                    // onPress={dayClicked(item)}
                    backgroundColor={{ backgroundColor }}
                />
                );
            };

        
        
        const dayClicked = (item) => {
            console.log(item);
            switch(item.id){
                case 1: 
                loadData("monday");
                setNgay(ngay-(thu-1));
                setThu(1);
                break;
                case 2: 
                loadData("tuesday");
                setNgay(ngay-(thu-2));
                setThu(2);
                break;
                case 3: 
                loadData("wednesday");
                setNgay(ngay-(thu-3));
                setThu(3);
                break;
                case 4: 
                setNgay(ngay-(thu-4));
                setThu(4);
                loadData("thursday");
                break;
                case 5: 
                setNgay(ngay-(thu-5));
                setThu(5);
                loadData("friday");
                break;
                case 6: 
                setNgay(ngay-(thu-6));
                setThu(6);
                loadData("saturday");
                break;
                case 7: 
                setNgay(ngay-(thu-7));
                setThu(7);
                loadData('sunday');
                break;
                
            }

        }
    return (
        <SafeAreaView style={styles.container}>
           
            <View style={styles.day}>
                <SafeAreaView style={styles.flatlist}>
                    <ScrollView style={styles.scrollView}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={day}
                            renderItem={renderDay}
                            keyExtractor={item => item.id}
                            // extraData={selectedId}
                        />
                    </ScrollView>
                </SafeAreaView>
            </View>
            <View
                style={{
                    marginTop:20,
                    borderBottomColor: '#FF5C00',
                    borderBottomWidth: 2,
                }}
                />

            <View>
                <Text style={styles.lichHoc}>
                Lịch học ngày {ngay}/{thang}/{nam}
                </Text>
            </View>

            <SafeAreaView style={styles.flatlist}>
                <ScrollView style={styles.scrollView}>
                    <FlatList
                        extraData={DATA}
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        
                    />
                </ScrollView>
            </SafeAreaView>

        </SafeAreaView>

    )
}
export default TimeTable;

const styles = StyleSheet.create({
    item:{
        // borderWidth:1,
        borderRadius:6, 
        backgroundColor:'#50C2C9',
        marginTop:20,
        padding:8
    },
    scrollView:{

    },
    flatlist:{
        marginHorizontal:20,
    },
    lichHoc:{
        textAlign:'left',
        fontWeight:'bold',
        fontSize:20,
        marginLeft:10,
        marginTop:10,
    },
    TextSingleDay:{
        marginTop:10,
        textAlign:'center',
        fontWeight: 'bold'
        
    },
    singleDay:{
        // marginLeft: ,
        // backgroundColor:'white',
        alignItems:'center',
        height:50,
        // marginRight:10,
        marginHorizontal: 10,
        // borderWidth: 1,
        borderRadius : 5,
        width:30,
        
    },
    day:{
       marginTop:20,
        

    },
    container: {
        flex:1,
      backgroundColor : 'white',
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
    logo:{
        flex:0.1,
        alignSelf : 'center',
        width:51,
        height:27
    },
    });
