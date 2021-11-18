/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createStackNavigator} from '@react-navigation/stack';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {HomeScreen, ResultsScreen, SignIn, SignUp} from './screens';
import Menu from './navigation/Menu';

const AuthStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#333' : '#ccc',
  };

  //   <SafeAreaView style={backgroundStyle}>
  //   <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
  //   <ScrollView
  //     contentInsetAdjustmentBehavior="automatic"
  //     style={backgroundStyle}>

  //   </ScrollView>
  // </SafeAreaView>

  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="SignIn"
          component={SignIn}
          options={{title: 'Sign In'}}
        />
        <AuthStack.Screen
          name="SignUp"
          component={SignUp}
          options={{title: 'Create Account'}}
        />
      </AuthStack.Navigator>
      {/* <Menu /> */}
    </NavigationContainer>
  );
};

//Styles Example
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
