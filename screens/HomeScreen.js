import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

function HomeScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
    style={{
      backgroundColor: isDarkMode ? '#000' : '#fff',
    }}>
      <Text>Hello world</Text>
  </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  }
}) 