import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useColorScheme} from 'react-native';
import {LoginForm, SignupForm} from './screens';
import Menu from './navigation/Menu';
import LoadingScreen from './screens/LoadingScreen';

import {useAuth, AuthProvider} from './providers/AuthProvider';

const AuthStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

const ProtectedApp = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#333' : '#ccc',
  };

  const [loading, setLoading] = useState(true);
  const [queryString, setQueryString] = useState('');
  const {user, signUp, signIn} = useAuth();

  setTimeout(() => {
    setLoading(false);
  }, 5000);

  return (
    <NavigationContainer>
      {user ? (
        <Menu queryString={queryString} setQueryString={setQueryString} />
      ) : (
        <AuthStack.Navigator
          initialRouteName="SignIn"
          screenOptions={({route}) => ({
            headerShown: false,
          })}>
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
      )}
    </NavigationContainer>
  );
};

export default ProtectedApp;
