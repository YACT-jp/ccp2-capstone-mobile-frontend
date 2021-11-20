/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {LoadingScren, LoginForm, SignupForm} from './screens';
import Menu from './navigation/Menu';
import {AuthContext} from './context';
import LoadingScreen from './screens/LoadingScreen';

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

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [queryString, setQueryString] = useState('');

  setTimeout(() => {
    setLoading(false);
  }, 5000);

  if (user) {
    return (
      <NavigationContainer>
        <AuthContext.Provider value={{user, setUser}}>
          <Menu queryString={queryString} setQueryString={setQueryString} />
        </AuthContext.Provider>
      </NavigationContainer>
    );
  } else {
    if (loading) {
      return <LoadingScreen></LoadingScreen>;
    }
    return (
      <NavigationContainer>
        <AuthContext.Provider value={{user, setUser}}>
          <AuthStack.Navigator initialRouteName="SignIn">
            <AuthStack.Screen
              name="SignIn"
              component={LoginForm}
              options={{title: 'Sign In'}}
            />
            <AuthStack.Screen
              name="Signup"
              component={SignupForm}
              options={{title: 'Create Account'}}
            />
          </AuthStack.Navigator>
        </AuthContext.Provider>
      </NavigationContainer>
    );
  }
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
