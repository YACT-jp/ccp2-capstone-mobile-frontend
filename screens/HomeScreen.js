import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

function HomeScreen({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
    style={{
      backgroundColor: isDarkMode ? '#000' : '#fff',
    }}>
      <Text style={styles.text}>Home Page</Text>
  </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
  text: {
    color: 'rgb(59,108,212)'
  }
}) 