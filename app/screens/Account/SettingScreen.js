import React,{useState} from 'react'
import { StyleSheet, Text, TextInput, View , TouchableOpacity, Image} from 'react-native';
import {  Header,Avatar,Button, Overlay  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

    
const SettingScreen = ({navigation}) => {
    
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/* <View style={styles.avatar}>
                <Avatar
                    rounded
                    size='xlarge'
                    imageProps={{resizeMode: 'cover'}} 
                    source={require('../../assets/images/avt.png')} 
                />
                <Text style={{color:'#00AFB9', fontSize:18, fontWeight:'bold', marginTop:10}}>THAY ĐỔI ẢNH ĐẠI DIỆN</Text>
                </View> */}
                <View style={styles.form}>
                    <Text style={{fontSize:20, fontWeight:'bold', marginBottom:20}}>Thay đổi mật khẩu</Text>
                    <Text>Nhập mật khẩu cũ</Text>
                    <TextInput
                        style={styles.input} 
                        // value={this.state.email}
                        // onChangeText={email=> this.setState({email})}
                        />
                    <Text>Mật khẩu mới</Text>
                    <TextInput 
                        style={styles.input}
                        secureTextEntry
                        //  value={this.state.password}
                        //  onChangeText={password => this.setState({password})}
                        />
                    <Text>Nhập lại mật khẩu</Text>
                    <TextInput 
                        style={styles.input}
                        secureTextEntry
                        //  value={this.state.password}
                        //  onChangeText={password => this.setState({password})}
                        />

                    

                    <TouchableOpacity style={{marginTop:10,  alignItems:'center'}}>
                        <Text style={{color:'#FF5C00', fontWeight:'bold', fontSize:15}}>LƯU LẠI</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    )
}
export default SettingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    iconHeader:{
        color:'white',
        fontSize:20
      },
      avatar:{
        marginTop:30,
        justifyContent: 'center',
        alignItems: 'center',
      },
      content:{
        padding:30
        
      },
      form:{
        marginTop:30,
      },
      input:{
        marginTop:5,
        marginBottom:10,
        alignItems: 'center',
        backgroundColor:'#E5E5E5',
      },
});
