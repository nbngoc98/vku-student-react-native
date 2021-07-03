import React, { Component } from 'react';
import {Firebase, auth} from '../config/firebase';
import { View, Text, TextInput,StyleSheet, TouchableOpacity,Button, Modal, ActivityIndicator,KeyboardAvoidingView } from 'react-native';
import Loader from '../Loader'

class EmailAndPassword extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email:'',
            password:'',
            error:'',
            loading:false,
        };
      }

    // nbngoc.17it2@vku.udn.vn
    onBottomPress = () =>{
        this.setState({
            loading:true
        })
        auth.signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(this.onLoginSuccess)
        .catch(err => {
            setTimeout(()=>{this.setState({loading:false})}, 1000); 
            if (this.state.email == '' || this.state.password == '') {
                this.setState({error: 'Email hoặc mật khẩu không được để trống'})
            }else{
                this.setState({error: err.message})
            }
            
        })

    
    }
    onLoginSuccess =  () =>{
        this.setState({
            error:'',
            loading:false
        })
    }

    render() {
        return (
            <View  style={styles.container}>
                <Loader loading={this.state.loading}/>
                <KeyboardAvoidingView enabled>
                <Text>Email sinh viên</Text>
                <TextInput
                    style={styles.input} 
                    value={this.state.email}
                    onChangeText={email=> this.setState({email})}
                     />
                 <Text>Mật khẩu</Text>
                 <TextInput 
                    style={styles.input}
                    secureTextEntry
                     value={this.state.password}
                     onChangeText={password => this.setState({password})}
                     />

                

                 <TouchableOpacity style={styles.buttonContainer} onPress={this.onBottomPress} >
                     <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
                 </TouchableOpacity>

                 <TouchableOpacity  >
                     <Text style={styles.rename}>Quên mật khẩu</Text>
                 </TouchableOpacity>

                 <Text style={styles.errorText} >
                         {this.state.error}
                </Text>
                </KeyboardAvoidingView>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:20,
        // alignItems: 'center',
        justifyContent:'center',
     
    },
    input:{
        height:40,
        backgroundColor:'gainsboro',
        paddingLeft:10,
        marginBottom:15,
        marginTop: 3,
        borderRadius:5,
        fontSize:15,
    
    },
    errorText:{
        fontSize:13,
        color:'red',
        alignSelf:'center',
        marginTop:10

    },
    buttonText:{
        textAlign:'center',
        color:'#fff',
        fontWeight:'bold',
        marginTop:8,
        fontSize:17
    },
    buttonContainer:{
        height: 40,
        backgroundColor:'#FF5C00',
        borderRadius:5,
        marginTop:10
    },
    rename:{
        marginTop: 10,
        fontSize: 12,
        textAlign:'center',
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
      },
      activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
      },
      activityIndicator: {
        alignItems: 'center',
        height: 80,
      },
  });

export default EmailAndPassword
