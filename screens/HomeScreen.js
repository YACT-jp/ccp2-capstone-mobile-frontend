import React, {useState, useEffect} from 'react';
import {
  TextInput,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  FlatList
} from 'react-native';
import {Button, Text, HStack, View, VStack, Pressable, Image, NativeBaseProvider} from 'native-base';
import { searchContext } from '../providers/SearchProvider';
import { mediaResultsApi } from '../data/data';

function HomeScreen({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const [text, setText] = useState('');
  const [queryString, setQueryString] = React.useContext(searchContext);
  const [threeRandomMedia, setThreeRandomMedia] = useState([]);

  //Hook
  useEffect(async () => {
    const fetchedThreeMedia = await fetchThreeRandomData();
    setThreeRandomMedia(fetchedThreeMedia);
  },[]);

  //Hanlder
  async function fetchThreeRandomData() {
    const data = await mediaResultsApi();

    const randomThree = [];
    while(randomThree.length < 3){
      let randomIndex = Math.floor(Math.random() * data.length);
      
      if(!randomThree.includes(randomIndex)){
        randomThree.push(randomIndex);
      }
    }
    return randomThree.map(index => data[index]);
  }

  const renderItem = ({item}) =>
  item.name.toLowerCase().includes(queryString.toLowerCase()) ? (
    <Item
      name={item.name}
      path={item['poster_path']}
      description={item['overview']}
      mediaId={item['id']}
    />
  ) : null;

  //Rendering function
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
      <View
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
        <FlatList data={threeRandomMedia} renderItem={renderItem}></FlatList>
        <Button
          margin="2"
          colorScheme="blue"
          onPress={() =>
            navigation.navigate('Search', {screen: 'Media Results'})
          }>
          Go to Results
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;


