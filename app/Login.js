import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native';
import EmailAndPassword from './components/EmailAndPassword';
const Login = () => {
  return (
    <View style={styles.container}>
            <View style={styles.logoContainer}>
            <Image source={require('./assets/images/vku.png')}  style={styles.logo}/>
            <Text style={styles.textLogo}>STUDENT SOCIAL VKU</Text>
            </View>
            <View style={styles.emailAndPassword}>
                <EmailAndPassword/>
                
            </View>
            
        </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logoContainer:{
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
    },
    logo:{
        resizeMode: 'center',
        width: 250,
        height:80,
        marginTop:200
    },
    textLogo:{
        color:'black',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 7
    },
    emailAndPassword:{
        flex:2
    },

});

export default Login
