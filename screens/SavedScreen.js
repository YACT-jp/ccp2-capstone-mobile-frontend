import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
} from 'react-native';

function SavedScreen({navigation}) {
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
        <Text>Saved Location go here</Text>
      </View>
    </SafeAreaView>
  );
}

export default SavedScreen;
