import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useColorScheme, FlatList, TouchableOpacity, Button } from 'react-native';

// import { searchContext } from '../components/searchContext';
import { savedLocations } from '../data/data';

function SavedScreen({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const [DATA, setDATA] = useState([]);

  useEffect( () => {
    async function fetchData() {
      //const data = await savedLocationsApi();
      const data = savedLocations();
      console.log('data', data);
      setDATA(data);
    }
    fetchData();
  }, []);

  //List Item Component 
  const Item = ({ name, fullItem }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => navigation.navigate('Location', {fullItem})} >
        <Text style={styles.name}>{name}</Text>
        <Text>{fullItem['plus_code']}</Text>
      </TouchableOpacity>
    </View>
  );

  //Process each item of the data array
  const renderItem = ({ item }) => (
    <Item name={item.name} fullItem={item} />
  );

  return (
    <View
    style={{ 
      backgroundColor: isDarkMode ? '#000' : '#fff',
    }}>
      <Text style={styles.name}>Saved Locations</Text>
      <FlatList
      data={DATA}
      renderItem={renderItem}>
      </FlatList>
      <Button title="Back to search results" onPress={() => navigation.navigate('Search', { screen: 'Locations' })} />
  </View>
  );
}

export default SavedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#eeee33',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  name: {
    fontSize: 32,
  },
});