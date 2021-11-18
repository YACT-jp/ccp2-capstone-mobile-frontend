import React from 'react';
import { View, Text, Button, StyleSheet, useColorScheme } from 'react-native';

function ProfileScreen({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
    style={{
      backgroundColor: isDarkMode ? '#000' : '#fff',
    }}>
      <Text>Your profile here</Text>
      <Button
        title="Go to Results"
        onPress={() => navigation.navigate('Search')}
      />
  </View>
  );
}

export default ProfileScreen;