
import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import {
  NavigationContainer,
  // DarkTheme,
  // DrawerActions
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { useColorScheme, AppearanceProvider } from 'react-native-appearance';

// const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();
// const MaterialBottomTabs = createMaterialBottomTabNavigator();
const MaterialTopTabs = createMaterialTopTabNavigator();



import AccountScreen from './screens/Account/AccountScreen';
import NotificationScreen from './screens/Notification/NotificationScreen';
import SearchNews from './screens/News/SearchNews';
import NewsDetailScreen from './screens/News/NewsDetailScreen';
import HomeScreen from './screens/HomeScreen';
import TimeTable from './screens/TimeTable/TimeTable';
import TranscriptScreen from './screens/Transcript/TranscriptScreen';
import AccumulateScreen from './screens/Accumulate/AccumulateScreen';
import SettingScreen from './screens/Account/SettingScreen';
import SingleItem from './screens/Notification/SingleItem';

import NewsTab1 from './screens/News/tabs/Tab1';
import NewsTab2 from './screens/News/tabs/Tab2';
import NewsTab3 from './screens/News/tabs/Tab3';

import ContactTab1 from './screens/Contact/tabs/Tab1';
import ContactTab2 from './screens/Contact/tabs/Tab2';


const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const AccountStack = createStackNavigator();
const Notification= createStackNavigator();
const NewsStack = createStackNavigator();

const RouteApp = ({navigation}) => {
  // const colorScheme = useColorScheme();

  // const MyTheme = {
  //   dark: false,
  //   colors: {
  //     primary: '#0083B0',
  //     background: 'white',
  //     card: 'white',
  //     text: 'black',
  //     border: 'green',
  //   },
    
  // }

  return (
    // <AppearanceProvider>
    //   <NavigationContainer theme={colorScheme == 'dark' ? DarkTheme : MyTheme}
    //     // linking={linking}
    //   >
      // <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home': 'home';
              } 
              else if (route.name === 'Notification') {
                iconName = focused ? 'notifications': 'notifications';
              }
              else if (route.name === 'News') {
                iconName = focused ? 'article': 'article';
              }
              else if (route.name === 'Account') {
                iconName = focused ? 'person': 'person';
              }
              
              return <Icon name={iconName} size={size} color={color} />;
            },
            "tabBarActiveTintColor": "#0083B0",
            "tabBarInactiveTintColor": "gray",
            headerShown: false,
            tabBarLabel:() => {return null},
          })}
          
        >
          <Tab.Screen name="Home" options = { { fontSize:20, } }
          >
            {() => (
                <HomeStack.Navigator>
                  <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
                  <HomeStack.Screen name="TimeTable" component={TimeTable} 
                    options={{
                      title: 'Thời khóa biểu',
                      headerStyle: {
                        backgroundColor: '#0083B0',
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        // fontWeight: 'bold',
                      },
                      headerTitleAlign:'center',
                    }}
                  />
                  <HomeStack.Screen name="Transcript" component={TranscriptScreen} 
                    options={{
                      title: 'Kết quả học tập',
                      headerStyle: {
                        backgroundColor: '#0083B0',
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        // fontWeight: 'bold',
                      },
                      headerTitleAlign:'center',
                    }}
                  />
                  <HomeStack.Screen name="Accumulate" component={AccumulateScreen} 
                    options={{
                      title: 'Điểm tích luỹ',
                      headerStyle: {
                        backgroundColor: '#0083B0',
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        // fontWeight: 'bold',
                      },
                      headerTitleAlign:'center',
                    }}
                  />
                  
                  <HomeStack.Screen name="ContactScreen"
                    options={{
                      title: 'Liên Hệ',
                      headerStyle: {
                        backgroundColor: '#0083B0',
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        // fontWeight: 'bold',
                      },
                      headerTitleAlign:'center',
                    }}
                  >
                  {() => (
                        <MaterialTopTabs.Navigator>
                          <MaterialTopTabs.Screen name="ContactTab1"component={ContactTab1}
                            options = { { title : 'Giảng Viên'} }
                          />
                          <MaterialTopTabs.Screen name="ContactTab2" component={ContactTab2} 
                            options = { { title : 'Thành Viên Lớp'} }
                          />
                        </MaterialTopTabs.Navigator>
                  )}
                  </HomeStack.Screen>
                </HomeStack.Navigator>
              )}
          </Tab.Screen>
          <Tab.Screen name="Notification" options={{  title:'Thông báo' }} >
            {() => (
                  <Notification.Navigator>
                    <Notification.Screen name="NotificationScreen" component={NotificationScreen} 
                      options={{
                        title: 'Thông Báo',
                        headerStyle: {
                          backgroundColor: '#0083B0',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                          // fontWeight: 'bold',
                        },
                        headerTitleAlign:'center',
                        // headerRight: () => (
                        //   <TouchableOpacity 
                        //     // onPress={() => navigation.navigate('SettingScreen')}
                        //   >
                        //   <FontAwesome5 
                        //       style={{color:'white',fontSize:18, marginRight:10}}
                        //       name='cog'
                        //   />
                        //   </TouchableOpacity>
                        // ),
                      }}
                    />
                    <Notification.Screen name="SingleItem" component={SingleItem} 
                      options={{
                        title: 'Chi Tiết Thông Báo',
                        // headerStyle: {
                        //   backgroundColor: '#0083B0',
                        // },
                        // headerTintColor: '#fff',
                        headerTitleStyle: {
                          fontWeight: 'bold',
                        },
                        headerTitleAlign:'center',
                      }}
                    />
                  </Notification.Navigator>
                )}
            </Tab.Screen>
          <Tab.Screen name="News" options = { { title : 'Tin tức', fontSize:20 } }>
          {() => (
                <NewsStack.Navigator>
                  <NewsStack.Screen name="News"
                    options={{
                      title: 'Tin Tức',
                      headerStyle: {
                        backgroundColor: '#0083B0',
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        // fontWeight: 'bold',
                      },
                      headerTitleAlign:'center',
                      headerRight: () => (
                        <TouchableOpacity 
                          onPress={() => navigation.navigate('SearchScreen')}
                        >
                        <FontAwesome5 
                            style={{color:'white',fontSize:18, marginRight:10}}
                            name='search'
                        />
                        </TouchableOpacity>
                      ),
                    }}
                  >
                  {() => (
                        <MaterialTopTabs.Navigator>
                          <MaterialTopTabs.Screen name="NewsTab1"component={NewsTab1}
                            options = { { title : 'Nổi bật'} }
                          />
                          <MaterialTopTabs.Screen name="NewsTab2" component={NewsTab2} 
                            options = { { title : 'Sự kiện lớn'} }
                          />
                          <MaterialTopTabs.Screen name="NewsTab3" component={NewsTab3} 
                            options = { { title : 'VKU Press'} }
                          />
                        </MaterialTopTabs.Navigator>
                  )}
                  </NewsStack.Screen>
                  <NewsStack.Screen name="NewsDetailScreen" component={NewsDetailScreen} 
                    options={{
                      title: 'Chi Tiết Tin Tức',
                      headerTitleStyle: {
                        // fontWeight: 'bold',
                      },
                      headerTitleAlign:'center',
                    }}
                  />
                  <NewsStack.Screen name="SearchScreen" component={SearchNews} 
                    options={{
                      title: 'Tìm kiếm tin tức',
                      headerTitleStyle: {
                        // fontWeight: 'bold',
                      },
                      headerTitleAlign:'center',
                    }}
                  />
                </NewsStack.Navigator>
              )}
          </Tab.Screen>
          <Tab.Screen name="Account"  options = { { title : 'Tài khoản', fontSize:20 } }>
          {({navigation}) => (
                <AccountStack.Navigator>
                  <AccountStack.Screen name="AccountScreen" component={AccountScreen} 
                    options={{
                      title: 'Tài khoản của tôi',
                      headerStyle: {
                        backgroundColor: '#0083B0',
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        // fontWeight: 'bold',
                      },
                      headerTitleAlign:'center',
                      // headerLeft:()=>(
                      //   <TouchableOpacity 
                      //     onPress={() => navigation.goBack()}
                      //   >
                      //   <FontAwesome5 
                      //       style={{color:'white',fontSize:18, marginLeft:10}}
                      //       name='chevron-left'
                      //   />
                      //   </TouchableOpacity>
                      // ),
                      headerRight: () => (
                        <TouchableOpacity 
                          onPress={() => navigation.navigate('SettingScreen')}
                        >
                        <FontAwesome5 
                            style={{color:'white',fontSize:18, marginRight:10}}
                            name='cog'
                        />
                        </TouchableOpacity>
                      ),
                    }}
                  />
                  <AccountStack.Screen name="SettingScreen" component={SettingScreen} 
                    options={{
                      title: 'Cài đặt',
                      headerStyle: {
                        backgroundColor: '#0083B0',
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        // fontWeight: 'bold',
                      },
                      headerTitleAlign:'center',
                    }}
                  />
                </AccountStack.Navigator>
              )}
          </Tab.Screen>
        </Tab.Navigator>
      // </NavigationContainer>
    // </AppearanceProvider>
    
    
  );

  
  
}
export default RouteApp;