import React from 'react';
import { View, Text, StyleSheet, useColorScheme, FlatList, TouchableOpacity, Button } from 'react-native';
import mediaResults from '../data/data';
import { searchContext } from '../components/searchContext';

function ResultsScreen({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [queryString, setQueryString] = React.useContext(searchContext);
  const DATA = JSON.parse(mediaResults());

  //List Item Component 
  const Item = ({ name }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => navigation.navigate('MediaLocationsResults')} >
        <Text style={styles.name}>{name}</Text>
      </TouchableOpacity>
    </View>
  );

  //Process each item of the data array
  const renderItem = ({ item }) => (
    item.Name.toLowerCase().includes(queryString.toLowerCase()) ? <Item name={item.Name} /> : null
  );

  return (
    <View
    style={{ 
      backgroundColor: isDarkMode ? '#000' : '#fff',
    }}>
      <Text style={styles.name}>Searching for: {queryString}</Text>
      <FlatList
      data={DATA}
      renderItem={renderItem}>
      </FlatList>
      <Button title="Go back" onPress={() => navigation.goBack()} />
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