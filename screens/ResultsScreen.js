import React from 'react';
import { View, Text, StyleSheet, useColorScheme, FlatList } from 'react-native';
import mediaResults from '../data/data';

function ResultsScreen({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const DATA = JSON.parse(mediaResults());

  //List Item Component 
  const Item = ({ name }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{name}</Text>
    </View>
  );

  //Process each item of the data array
  const renderItem = ({ item }) => (
    <Item name={item.Name} />
  );

  return (
    <View
    style={{ 
      backgroundColor: isDarkMode ? '#000' : '#fff',
    }}>
      <FlatList
      data={DATA}
      renderItem={renderItem}>

      </FlatList>
  </View>
  );
}

export default ResultsScreen;

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