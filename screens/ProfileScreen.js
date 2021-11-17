import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

function ProfileScreen({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
    style={{
      backgroundColor: isDarkMode ? '#000' : '#fff',
    }}>
      <Text>Your profile here</Text>
  </View>
  );
}

export default ProfileScreen;