import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, useColorScheme, FlatList} from 'react-native';
import {
  Center,
  Heading,
  Input,
  IconButton,
  Button,
  HStack,
  VStack,
  View,
  Pressable,
  Text,
  Image,
  NativeBaseProvider,
  SearchIcon,
} from 'native-base';
import {TextInput} from 'react-native';
import theme from '../theme';
import {searchContext} from '../providers/SearchProvider';
import {mediaResultsApi} from '../data/data';
import {useFocusEffect} from '@react-navigation/core';

function ResultsScreen({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [text, setText] = useState('');
  const [queryString, setQueryString] = React.useContext(searchContext);
  const [DATA, setDATA] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await mediaResultsApi();
  //     setDATA(data);
  //   }
  //   fetchData();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        try {
          const res = await mediaResultsApi();
          setDATA(res);
          return res;
        } catch (error) {
          throw error;
        }
      }
      fetchData();
      // this function runs on "screen unfocus/unmount"
      return () => {
        console.log('unmount Results Screen');
      };
    }, []),
  );

  //List Item Component
  const Item = ({name, path, description, mediaId}) => (
    <Pressable
      rounded="lg"
      onPress={() =>
        navigation.navigate('Location Results', {
          name,
          mediaId,
          description,
        })
      }>
      <HStack
        bgColor="#d5524aff"
        rounded="lg"
        my="2"
        px="4"
        py="2"
        alignItems="center">
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
        />
        <VStack w="225" maxW="225" ml="4">
          <Heading
            fontSize="xl"
            color="white"
            // maxW="225"
          >
            {name}
          </Heading>
          <Text
            fontSize="xs"
            color="white"
            isTruncated
            // maxW="225"
            fontWeight="500"
            multiline={true}
            numberOfLines={2}>
            {description}
          </Text>
        </VStack>
      </HStack>
    </Pressable>
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
    <NativeBaseProvider theme={theme}>
      <Center>
        <Input
          value={text}
          onChangeText={text => {
            setText(text);
            setQueryString(text);
          }}
          placeholder="Search anime, novels, &amp; movies"
          bg="#fff"
          width="100%"
          borderRadius="4"
          py="3"
          px="1"
          fontSize="14"
          _web={{
            _focus: {borderColor: 'muted.300', style: {boxShadow: 'none'}},
          }}
          InputLeftElement={
            <IconButton
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              icon={<SearchIcon />}
              _icon={{
                color: '#3c83f3ff',
                size: 'sm',
              }}
            />
          }
        />
        <FlatList data={DATA} renderItem={renderItem}></FlatList>
      </Center>
    </NativeBaseProvider>
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
