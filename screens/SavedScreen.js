import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

function SavedScreen({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
    style={{
      backgroundColor: isDarkMode ? '#000' : '#fff',
    }}>
      <Text>Saved Location go here</Text>
  </View>
  );
}

export default SavedScreen;