import React, {useState, useCallback} from 'react';
import {
  FlatList,
  Center,
  HStack,
  Pressable,
  Heading,
  Image,
  NativeBaseProvider,
} from 'native-base';
import theme from '../theme';
import {getAsyncSavedLocations} from '../data/asyncSavedLocations';
import {useFocusEffect} from '@react-navigation/core';

function SavedScreen({navigation}) {
  const [DATA, setDATA] = useState([]);

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
        console.log('unmount Saved Screeen');
      };
    }, []),
  );

  //List Item Component
  const Item = ({name, fullItem}) => (
    <Pressable
      onPress={() => navigation.navigate('Saved Location', {fullItem})}>
      <HStack bgColor="lightBlue.500" rounded="lg" m="2" px="4" py="2" alignItems="center">
        <Image
          border={1}
          borderWidth={5}
          borderColor="white"
          height={150}
          borderRadius={150}
          source={{
            uri: fullItem.location_pic,
          }}
          alt="No image"
          size="xl"
        />
        <Heading
          ml="4"
          fontSize="xl"
          color="white"
          maxW="50%"
          >
          {name}
        </Heading>
      </HStack>
    </Pressable>
  );

  //Process each item of the data array
  const renderItem = ({item}) => <Item name={item.name} fullItem={item} />;

  return (
    <NativeBaseProvider theme={theme}>
      <Center>
        <FlatList data={DATA} renderItem={renderItem}></FlatList>
      </Center>
    </NativeBaseProvider>
  );
}

export default SavedScreen;
