import React, {useState, useEffect} from 'react';
import {StyleSheet, useColorScheme, SafeAreaView} from 'react-native';
import {
  SearchIcon,
  Center,
  Input,
  FlatList,
  Heading,
  Button,
  Text,
  Box,
  HStack,
  View,
  VStack,
  Pressable,
  Image,
  NativeBaseProvider,
  ScrollView,
} from 'native-base';
import theme from '../theme';
import {searchContext} from '../providers/SearchProvider';
import {mediaResultsApi, locationResultApi} from '../data/data';

function HomeScreen({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [queryString, setQueryString] = React.useContext(searchContext);
  const [threeRandomMedias, setThreeRandomMedia] = useState([]);
  const [threeRandomLocations, setThreeRandomLocations] = useState([]);

  //Hook
  useEffect(async () => {
    const mediaData = await mediaResultsApi();
    const fetchedThreeMedias = fetchThreeRandomData(mediaData);
    setThreeRandomMedia(fetchedThreeMedias);

    const locationData = await locationResultApi();
    const fetchedThreeLocations = fetchThreeRandomData(locationData);
    setThreeRandomLocations(fetchedThreeLocations);
  }, []);

  //Hanlder
  function fetchThreeRandomData(data) {
    const randomThree = [];
    while (randomThree.length < 3) {
      let randomIndex = Math.floor(Math.random() * data.length);

      if (!randomThree.includes(randomIndex)) {
        randomThree.push(randomIndex);
      }
    }
    return randomThree.map(index => data[index]);
  }

  const renderMediaItem = ({item}) => (
    <MediaItem
      name={item.name}
      path={item['poster_path']}
      description={item['overview']}
      id={item['id']}
    />
  );

  const renderLocationItem = ({item}) => (
    <LocationItem
      fullItem={item}
      name={item.name}
      description={item.description}
    />
  );

  const MediaItem = ({name, path, description, mediaId}) => (
    <Box
      rounded="lg"
      // onPress={() =>
      //   navigation.navigate('Location Results', {
      //     name,
      //     mediaId,
      //     description,
      //   })
      // }
    >
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
          <Heading fontSize="xl" color="white">
            {name}
          </Heading>
          <Text
            fontSize="xs"
            color="white"
            isTruncated
            fontWeight="500"
            multiline={true}
            numberOfLines={2}>
            {description}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );

  const LocationItem = ({fullItem, name, description}) => (
    <Box
      rounded="lg"
      // onPress={() =>
      //   navigation.navigate('Location Results', {
      //     name,
      //     mediaId,
      //     description,
      //   })
      // }
    >
      <HStack
        bgColor="#3c83f3ff"
        rounded="lg"
        my="2"
        px="3"
        py="2"
        alignItems="center"
        justifyContent="space-between">
        <Image
          border={1}
          borderWidth={2}
          borderColor="white"
          height={150}
          borderRadius={150}
          source={{
            uri: fullItem.location_pic,
          }}
          alt="Media Image"
          size="md"
          ml="2.5"
        />
        <VStack w="225" maxW="225" ml="4">
          <Heading
            fontSize="xl"
            lineHeight="sm"
            color="white"
            isTruncated
            maxW="200"
            w="80%"
            multiline={true}
            numberOfLines={3}>
            {name}
          </Heading>
        </VStack>
      </HStack>
    </Box>
  );

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
    media_name: {
      fontSize: 32,
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <ScrollView
        style={styles.container}
        style={{
          backgroundColor: isDarkMode ? '#000' : '#fff',
        }}>
        <Input
          value={queryString}
          onChangeText={input => {
            setQueryString(input);
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
            <SearchIcon m="2" ml="3" size="6" color="gray.400" size="sm" />
          }
          InputRightElement={
            <Button
              mr="5"
              size="lg"
              margin="2"
              colorScheme="blue"
              onPress={() =>
                navigation.navigate('Search', {screen: 'Media Results'})
              }>
              Search
            </Button>
          }
        />

        <Heading mt="2" style={{textAlign: 'center'}}>
          Top Media
        </Heading>
        <Center>
          <FlatList
            data={threeRandomMedias}
            renderItem={renderMediaItem}></FlatList>
          <Heading style={{textAlign: 'center'}}>Top Locations</Heading>
          <FlatList
            data={threeRandomLocations}
            renderItem={renderLocationItem}></FlatList>
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
}

export default HomeScreen;
