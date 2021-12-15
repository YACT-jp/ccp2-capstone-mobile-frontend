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

  const renderMediaItem = ({item}) =>
  item.name.toLowerCase().includes(queryString.toLowerCase()) ? (
    <MediaItem
      name={item.name}
      path={item['poster_path']}
      description={item['overview']}
      id={item['id']}
    />
  ) : null;

  const renderLocationItem = ({item}) => (
    //JSON.parse(item['Media id']).includes(mediaId) ? <Item name={item.Name} fullItem={item} /> : null
    <LocationItem name={item.name} fullItem={item} />
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

  const LocationItem = ({name, fullItem}) => (
    <NativeBaseProvider>
      <View style={styles.item} rounded="xl">
        <Pressable
          rounded="xl"
          onPress={() => navigation.navigate('Location', {fullItem})}>
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
            <Text>
              {console.log(fullItem)}
            </Text>
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
        <Text style={styles.text}>Home Page</Text>
        <TextInput
          value={text}
          style={{fontSize: 42, color: 'steelblue'}}
          placeholder="Type here..."
          onChangeText={text => {
            setText(text);
            setQueryString(text);
          }}
        />
        <Text style={{fontSize: 24}}>
          {'\n'}You entered: {text}
        </Text>
        <FlatList data={threeRandomMedias} renderItem={renderMediaItem}></FlatList>
        <FlatList data={threeRandomLocations} renderItem={renderLocationItem}></FlatList>
        <Button
          margin="2"
          colorScheme="blue"
          onPress={() =>
            navigation.navigate('Search', {screen: 'Media Results'})
          }>
          Go to Results
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;


