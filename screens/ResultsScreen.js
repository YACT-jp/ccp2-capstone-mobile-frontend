import React, {useEffect, useState} from 'react';
import {StyleSheet, useColorScheme, FlatList, Button} from 'react-native';
import {
  HStack,
  View,
  Pressable,
  Text,
  Image,
  NativeBaseProvider,
} from 'native-base';

import { searchContext } from '../providers/SearchProvider';
import { mediaResultsApi } from '../data/data';

function ResultsScreen({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [queryString, setQueryString] = React.useContext(searchContext);
  const [DATA, setDATA] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await mediaResultsApi();
      setDATA(data);
      console.log(data);
    }
    fetchData();
  }, []);

  //List Item Component
  const Item = ({name, mediaId}) => (
    <NativeBaseProvider>
      <View style={styles.item} rounded="xl">
        <Pressable
          rounded="xl"
          onPress={() => navigation.navigate('Locations', {name, mediaId})}>
          <HStack
            style={styles.container}
            space={5}
            justifyContent="space-between">
            <Image
              border={1}
              borderWidth={5}
              borderColor="white"
              height={150}
              borderRadius={150}
              source={{
                uri: null,
              }}
              alt="Alternate Text"
              size="xl"
            />
            <Text
              fontSize="3xl"
              color="white"
              isTruncated
              maxW="200"
              w="80%"
              multiline={true}
              numberOfLines={3}>
              {name}
            </Text>
          </HStack>
        </Pressable>
      </View>
    </NativeBaseProvider>
  );

  //Process each item of the data array
  const renderItem = ({item}) =>
    item.name.toLowerCase().includes(queryString.toLowerCase()) ? (
      <Item name={item.name} mediaId={item['id']} />
    ) : null;

  return (
    <View
      style={styles.container}
      style={{
        backgroundColor: isDarkMode ? '#000' : '#fff',
      }}>
      <>
        {queryString === '' ? (
          <Text fontSize="3xl" textAlign="center">
            Searching <Text bold>all media</Text>
          </Text>
        ) : (
          <Text fontSize="3xl" textAlign="center">
            Results for: <Text bold>{queryString}</Text>
          </Text>
        )}
      </>
      <FlatList data={DATA} renderItem={renderItem}></FlatList>
      {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
    </View>
  );
}

export default ResultsScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  item: {
    backgroundColor: '#2096f3',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  name: {
    fontSize: 32,
  },
});
