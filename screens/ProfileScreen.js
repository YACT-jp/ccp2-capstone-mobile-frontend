import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import {useAuth, AuthProvider} from '../providers/AuthProvider';

function ProfileScreen({navigation}) {
  const {user, signUp, signOut} = useAuth();
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? '#000' : '#fff',
      }}>
      <View
        style={{
          backgroundColor: isDarkMode ? '#000' : '#fff',
        }}>
        <Text>Your profile here</Text>
        {/* <Button
        title="Go to Results"
        onPress={() => navigation.navigate('Search')}
      /> */}
        <Button
          title="Sign Out"
          onPress={() => {
            signOut();
            // navigation.navigate('Login');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;
