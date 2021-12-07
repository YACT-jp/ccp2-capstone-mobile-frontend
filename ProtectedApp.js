import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginForm, SignupForm} from './screens';
import Menu from './navigation/Menu';
import LoadingScreen from './screens/StartUpScreen';

import {useAuth} from './providers/AuthProvider';

const AuthStack = createNativeStackNavigator();

const ProtectedApp = () => {
  const [loading, setLoading] = useState(true);
  const [queryString, setQueryString] = useState('');
  const {user} = useAuth();

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {loading ? (
        <LoadingScreen />
      ) : user ? (
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
