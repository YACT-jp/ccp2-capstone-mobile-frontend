import React from 'react';
import {View, Text, Button, StyleSheet, useColorScheme} from 'react-native';
import {useAuth, AuthProvider} from '../providers/AuthProvider';

function ProfileScreen({navigation}) {
  const {user, signUp, signOut} = useAuth();
  const isDarkMode = useColorScheme() === 'dark';
  return (
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
  );
}

export default ProfileScreen;
