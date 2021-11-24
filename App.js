import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useColorScheme} from 'react-native';

import {LoginForm, SignupForm} from './screens';
import Menu from './navigation/Menu';
import LoadingScreen from './screens/LoadingScreen';
import ProtectedApp from './ProtectedApp.js';
import {useAuth, AuthProvider} from './providers/AuthProvider';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#333' : '#ccc',
  };

  return (
    <AuthProvider>
      <ProtectedApp />
    </AuthProvider>
  );
};

export default App;
