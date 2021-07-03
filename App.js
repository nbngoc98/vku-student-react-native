
import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import Screens
import Splash from './app/Splash';
import Login from './app/Login';
import RouteApp from './app/RouteApp';
import ResetEmail from './app/components/ResetEmail'

const Stack = createStackNavigator();
// const Auth = () => {
//   // Stack Navigator for Login and Sign up Screen
//   return (
//     <Stack.Navigator initialRouteName="Login">
//       <Stack.Screen
//         name="Login"
//         component={Login}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="ResetEmail"
//         component={ResetEmail}
//         options={{
//           title: 'ResetEmail', //Set Header Title
//           headerStyle: {
//             backgroundColor: '#307ecc', //Set Header color
//           },
//           headerTintColor: '#fff', //Set Header text color
//           headerTitleStyle: {
//             fontWeight: 'bold', //Set Header text style
//           },
//         }}
//       />
//     </Stack.Navigator>
//   );
// };

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="Splash"
          component={Splash}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="RouteApp"
          component={RouteApp}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;