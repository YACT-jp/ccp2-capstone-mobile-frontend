import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

function ResultsScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
    style={{
      backgroundColor: isDarkMode ? '#000' : '#fff',
    }}>
      <Text>Results go here</Text>
  </View>
  );
}

export default ResultsScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  }
}) 