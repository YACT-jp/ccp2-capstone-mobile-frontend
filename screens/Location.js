import React from 'react';
import { View, Text, Button, StyleSheet, useColorScheme } from 'react-native';

function Location({route, navigation}) {
  /*Get the params */
  const { fullItem } = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
    style={{
      backgroundColor: isDarkMode ? '#000' : '#fff',
    }}>
      <Text>Detailed Location Info</Text>
      <Text>{fullItem.Name}</Text>
      <Text>{fullItem._id}</Text>
      <Text>{fullItem['Plus Code']}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
  </View>
  );
}

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  name: {
    fontSize: 32,
  },
});