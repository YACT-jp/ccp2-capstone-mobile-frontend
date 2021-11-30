import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import {HStack, Image, NativeBaseProvider} from 'native-base';
import {searchContext} from '../components/searchContext';
import {mediaResultsApi} from '../data/data';

function ResultsScreen({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [queryString, setQueryString] = React.useContext(searchContext);
  const [DATA, setDATA] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await mediaResultsApi();
      setDATA(data);
    }
    fetchData();
  }, []);

  //List Item Component
  const Item = ({name, mediaId, mediaPic, originalName}) => (
    <NativeBaseProvider>
      <View style={styles.item}>
        <TouchableOpacity
          onPress={
            (() => navigation.navigate('Locations', {name, mediaId}),
            console.log('poster_path', mediaPic),
            console.log('original_name', originalName))
          }>
          <HStack space={3} justifyContent="space-between">
            <Image
              width={150}
              resizeMode={'contain'}
              borderRadius={100}
              source={{
                uri: 'https://image.tmdb.org/t/p/w500/' + `${mediaPic}`,
              }}
              alt="Alternate Text"
              size="xl"
            />
            <Text style={styles.name}>
              {name} (id:{mediaId})
            </Text>
          </HStack>
        </TouchableOpacity>
      </View>
    </NativeBaseProvider>
  );

  //Process each item of the data array
  const renderItem = ({item}) =>
    item.name.toLowerCase().includes(queryString.toLowerCase()) ? (
      <Item
        name={item.name}
        mediaId={item['id']}
        mediaPic={item['poster_path']}
        originalName={item['original_name']}
      />
    ) : null;

  return (
    <View
      style={{
        backgroundColor: isDarkMode ? '#000' : '#fff',
      }}>
      <Text style={styles.name}>Searching for: {queryString}</Text>
      <FlatList data={DATA} renderItem={renderItem}></FlatList>
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
