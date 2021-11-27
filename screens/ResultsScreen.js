import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useColorScheme, FlatList, TouchableOpacity, Button } from 'react-native';

import { searchContext } from '../components/searchContext';
import { mediaResultsApi } from '../data/data';

function ResultsScreen({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [queryString, setQueryString] = React.useContext(searchContext);
  const [DATA, setDATA] = useState([]);

  useEffect( () => {
    async function fetchData() {
      const data = await mediaResultsApi();
      setDATA(data);
    }
    fetchData();
  }, []);

  //List Item Component 
  const Item = ({ name, mediaId }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => navigation.navigate('Locations', {name, mediaId})} >
        <Text style={styles.name}>{name} (id:{mediaId})</Text>
      </TouchableOpacity>
    </View>
  );

  //Process each item of the data array
  const renderItem = ({ item }) => (
    item.name.toLowerCase().includes(queryString.toLowerCase()) ? <Item name={item.name} mediaId={item['id']} /> : null
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