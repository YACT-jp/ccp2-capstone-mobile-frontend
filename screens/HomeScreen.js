import React, {useState, useEffect} from 'react';
import {
  TextInput,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  FlatList
} from 'react-native';
import { Button, Text, HStack, View, VStack, Pressable, Image, NativeBaseProvider, ScrollView} from 'native-base';
import { searchContext } from '../providers/SearchProvider';
import { mediaResultsApi, locationResultApi } from '../data/data';

function HomeScreen({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const [text, setText] = useState('');
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
  },[]);

  //Hanlder
  function fetchThreeRandomData(data) {
    const randomThree = [];
    while(randomThree.length < 3 ){
      let randomIndex = Math.floor(Math.random() * data.length);
      
      if(!randomThree.includes(randomIndex)){
        randomThree.push(randomIndex);
      }
    }
    return randomThree.map(index => data[index]);
  }

  const renderMediaItem = ({item}) => (
    <MediaItem name={item.name} path={item['poster_path']} description={item['overview']} id={item['id']}/>
  );

  const renderLocationItem = ({item}) => (
    <LocationItem fullItem={item} media_name={item.media_name} description={item.description}/>
  );

  const MediaItem = ({name, path, description, mediaId}) => (
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

  const LocationItem = ({fullItem, media_name, description}) => (
    <NativeBaseProvider>
      <View style={styles.item} rounded="lg">
        <Pressable
          rounded="lg"
          onPress={() => navigation.navigate('Location', {fullItem})}>
          <HStack style={styles.container} space={5}>
            <Image
              border={1}
              borderWidth={2}
              borderColor="white"
              height={150}
              borderRadius={150}
              source={{
                uri: fullItem.location_pic,
              }}
              alt={`${media_name} poster`}
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
                {media_name}
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
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? '#000' : '#fff',
      }}>
      <ScrollView
        style={styles.container}
        style={{
          backgroundColor: isDarkMode ? '#000' : '#fff',
        }}>
        <TextInput
          value={text}
          style={{fontSize: 42, color: 'steelblue'}}
          placeholder="I want to search..."
          onChangeText={text => {
            setText(text);
            setQueryString(text);
          }}
        />
        <Button
          margin="2"
          colorScheme="blue"
          onPress={() =>
            navigation.navigate('Search', {screen: 'Media Results'})
          }>
          Search
        </Button>
        <Text style={{textAlign: 'center'}}>
          You may like these contents?
        </Text>
        <FlatList data={threeRandomMedias} renderItem={renderMediaItem}></FlatList>
        <Text style={{textAlign: 'center'}}>
          May be you wanna visit place here?
        </Text>
        <FlatList data={threeRandomLocations} renderItem={renderLocationItem}></FlatList>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;


