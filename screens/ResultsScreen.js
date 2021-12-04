import React, {useEffect, useState} from 'react';
import {StyleSheet, useColorScheme, FlatList} from 'react-native';
import {
  Button,
  HStack,
  VStack,
  View,
  Pressable,
  Text,
  Image,
  NativeBaseProvider,
} from 'native-base';

import {searchContext} from '../providers/SearchProvider';
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
  const Item = ({name, path, description, mediaId}) => (
    <NativeBaseProvider>
      <View style={styles.item} rounded="lg">
        <Pressable
          rounded="lg"
          onPress={() =>
            navigation.navigate('Location Results', {name, mediaId})
          }>
          <HStack style={styles.container} space={5}>
            <Image
              border={1}
              borderWidth={2}
              borderColor="white"
              height={150}
              borderRadius={150}
              source={{
                uri: 'https://image.tmdb.org/t/p/w500' + path,
              }}
              alt={`${name} poster`}
              size="md"
              ml="2"
            />
            <VStack>
              <Text
                fontSize="xl"
                color="white"
                isTruncated
                maxW="225"
                lineHeight="xs">
                {name}
              </Text>
              <Text
                mt="1"
                fontSize="2xs"
                color="white"
                isTruncated
                maxW="225"
                fontWeight="500"
                multiline={true}
                numberOfLines={3}>
                {description}
              </Text>
            </VStack>
          </HStack>
        </Pressable>
      </View>
    </NativeBaseProvider>
  );

  //Process each item of the data array
  const renderItem = ({item}) =>
    item.name.toLowerCase().includes(queryString.toLowerCase()) ? (
      <Item
        name={item.name}
        path={item['poster_path']}
        description={item['overview']}
        mediaId={item['id']}
      />
    ) : null;

  return (
    <View
      style={styles.container}
      style={{
        backgroundColor: isDarkMode ? '#000' : '#fff',
        flex: 1,
      }}>
      <>
        {queryString === '' ? (
          <Text fontSize="xl" textAlign="center" mt="2">
            Searching <Text bold>all media</Text>
          </Text>
        ) : (
          <Text fontSize="xl" textAlign="center">
            Results for: <Text bold>{queryString}</Text>
          </Text>
        )}
      </>
      <FlatList data={DATA} renderItem={renderItem}></FlatList>
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
    backgroundColor: '#3b81f6',
    padding: 10,
    marginVertical: 2,
    marginHorizontal: 16,
  },
  name: {
    fontSize: 32,
  },
});
