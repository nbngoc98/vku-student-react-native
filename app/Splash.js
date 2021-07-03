
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  Text
} from 'react-native';

// import AsyncStorage from '@react-native-community/async-storage';
import {auth} from '../app/config/firebase'

const Splash = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      auth.onAuthStateChanged(user => {
              navigation.replace(
                user === null ? 'Login' : 'RouteApp'
              )
             })
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
      <Image source={require('./assets/images/vku.png')}  style={styles.logo}/>
      <Text style={styles.textLogo}>STUDENT SOCIAL VKU</Text>
      </View>
      <ActivityIndicator
        animating={animating}
        color="#0000ff"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  logoContainer:{
    alignItems: 'center',
    justifyContent:'center',
},
logo:{
    resizeMode: 'center',
    width: 250,
    height:80,
},
textLogo:{
    color:'black',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 7
},
});