import React, {useState, useEffect} from 'react';
import {StyleSheet, useColorScheme, FlatList, Button} from 'react-native';
import {
  HStack,
  View,
  Pressable,
  Text,
  Image,
  NativeBaseProvider,
} from 'native-base';
import {locResultsByMedia} from '../data/data';

function LocResultsScreen({route, navigation}) {
  /*Get the params */
  const {name, mediaId} = route.params;
  const isDarkMode = useColorScheme() === 'dark';

  const [DATA, setDATA] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await locResultsByMedia(mediaId);
      setDATA(data);
    }
    fetchData();
  }, []);

  //List Item Component
  const Item = ({name, fullItem}) => (
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
          </HStack>
        </Pressable>
      </View>
    </NativeBaseProvider>
  );

  // Process each item of the data array
  const renderItem = ({item}) => (
    //JSON.parse(item['Media id']).includes(mediaId) ? <Item name={item.Name} fullItem={item} /> : null
    <Item name={item.name} fullItem={item} />
  );

  return (
    <View
      style={styles.container}
      style={{
        backgroundColor: isDarkMode ? '#000' : '#fff',
      }}>
      <Text
        fontSize="2xl"
        isTruncated
        margin="1"
        textAlign="center"
        multiline={true}
        numberOfLines={3}>
        Locations from: <Text bold>{name}</Text>
      </Text>
      <FlatList data={DATA} renderItem={renderItem}></FlatList>
      {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
    </View>
  );
}

export default LocResultsScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  item: {
    backgroundColor: '#2096f3',
    padding: 20,
    marginVertical: 2,
    marginHorizontal: 16,
  },
  name: {
    fontSize: 32,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
});
