import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  useColorScheme,
} from 'react-native';

import {LoginForm, SignupForm} from './screens';
import Menu from './navigation/Menu';
import {AuthContext} from './context';
import LoadingScreen from './screens/LoadingScreen';

const AuthStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#333' : '#ccc',
  };

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

export default App;
