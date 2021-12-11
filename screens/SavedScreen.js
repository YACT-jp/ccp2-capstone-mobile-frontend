import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  useColorScheme,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {
  Button,
  HStack,
  View,
  Pressable,
  Text,
  Image,
  NativeBaseProvider,
} from 'native-base';

import {getAsyncSavedLocations} from '../data/asyncSavedLocations';
import {useFocusEffect} from '@react-navigation/core';

function SavedScreen({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const [DATA, setDATA] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // load Saved Locations from AsyncStorage
  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        try {
          const res = await getAsyncSavedLocations();
          setDATA(res);
          return res;
        } catch (error) {
          throw error;
        }
      }
      fetchData();
      // this function runs on "screen unfocus/unmount"
      return () => {
        console.log('hello world');
      };
    }, []),
  );

  //List Item Component
  const Item = ({name, fullItem}) => (
    <NativeBaseProvider>
      <View style={styles.item} rounded="xl">
        <Pressable
          rounded="xl"
          onPress={() => navigation.navigate('Saved Location', {fullItem})}>
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
                uri: fullItem.location_pic,
              }}
              alt="Alternate Text"
              size="xl"
              ml="5"
            />
            <Text
              fontSize="4xl"
              lineHeight="sm"
              color="white"
              isTruncated
              maxW="180"
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
  const renderItem = ({item}) => <Item name={item.name} fullItem={item} />;

  const _renderFooter = () => (
    <View style={{paddingVertical: 4}}>
      <Button
        mt="1"
        margin="2"
        colorScheme="blue"
        onPress={() =>
          navigation.navigate('Search', {screen: 'Media Results'})
        }>
        Back to results
      </Button>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? '#000' : '#fff',
      }}>
      <View
        style={{
          backgroundColor: isDarkMode ? '#000' : '#fff',
          paddingBottom: 90,
        }}>
        <FlatList
          ListFooterComponent={() => _renderFooter()}
          data={DATA}
          renderItem={renderItem}></FlatList>
      </View>
    </SafeAreaView>
  );
}

export default SavedScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  item: {
    backgroundColor: '#3b81f6',
    padding: 20,
    marginVertical: 2,
    marginHorizontal: 16,
  },
});
