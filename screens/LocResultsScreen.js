import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import {locResultsByMedia} from '../data/data';

function LocResultsScreen({route, navigation}) {
  /*Get the params */
  const {name, mediaId} = route.params;
  const isDarkMode = useColorScheme() === 'dark';

  const [DATA, setDATA] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await locResultsByMedia(mediaId);
      setDATA(data);
    }
    fetchData();
  }, []);

  //List Item Component
  const Item = ({name, fullItem}) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Location', {fullItem})}>
        <Text style={styles.name}>{name}</Text>
      </TouchableOpacity>
    </View>
  );

  // Process each item of the data array
  const renderItem = ({item}) => (
    //JSON.parse(item['Media id']).includes(mediaId) ? <Item name={item.Name} fullItem={item} /> : null
    <Item name={item.name} fullItem={item} />
  );

  return (
    <View
      style={{
        backgroundColor: isDarkMode ? '#000' : '#fff',
        flex: 1,
      }}>
      <Text style={styles.name}>Locations matching Media ID: {mediaId}</Text>
      <FlatList data={DATA} renderItem={renderItem}></FlatList>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default LocResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
