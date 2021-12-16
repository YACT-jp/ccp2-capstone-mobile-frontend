import React, {useState, useEffect} from 'react';
import {
  SearchIcon,
  Center,
  Input,
  Heading,
  Button,
  Text,
  Box,
  HStack,
  VStack,
  Image,
  NativeBaseProvider,
  SectionList,
} from 'native-base';
import theme from '../theme';
import {searchContext} from '../providers/SearchProvider';
import {mediaResultsApi, locationResultApi} from '../data/data';

function HomeScreen({navigation}) {
  const [queryString, setQueryString] = React.useContext(searchContext);
  const [randomizedData, setRandomizedData] = useState([]);

  //Hook
  useEffect(() => {
    async function fetchData() {
      try {
        const mediaData = await mediaResultsApi();
        const locationData = await locationResultApi();

        if (mediaData !== undefined && locationData !== undefined) {
          setRandomizedData([
            {title: 'Top Media', data: fetchThreeRandomData(mediaData)},
            {title: 'Top Locations', data: fetchThreeRandomData(locationData)},
          ]);
        }
      } catch (error) {
        throw error;
      }
    }
    setTimeout(() => {
      fetchData();
    }, 500);
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

  const renderItem = ({item}) => {
    if (item.media_name === undefined) {
      return (
        <MediaItem
          name={item.name}
          path={item['poster_path']}
          description={item['overview']}
          id={item['id']}
        />
      );
    } else {
      return (
        <LocationItem
          fullItem={item}
          name={item.name}
          description={item.description}
        />
      );
    }
  };

  const MediaItem = ({name, path, description, mediaId}) => (
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
  );

  const LocationItem = ({fullItem, name, description}) => (
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
  );

  return (
    <NativeBaseProvider theme={theme}>
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
      <Center>
        <SectionList
          mb="20"
          sections={randomizedData}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
          renderSectionHeader={({section: {title}}) => (
            <Heading fontSize="lg" mt="8" mb="2">
              {title}
            </Heading>
          )}
        />
      </Center>
    </NativeBaseProvider>
  );
}

export default HomeScreen;
