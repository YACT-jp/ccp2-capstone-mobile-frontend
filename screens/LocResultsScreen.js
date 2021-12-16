import React, {useState, useEffect} from 'react';
import {StyleSheet, useColorScheme, FlatList, Button} from 'react-native';
import {
  Heading,
  Center,
  HStack,
  VStack,
  View,
  Pressable,
  Text,
  Image,
  NativeBaseProvider,
} from 'native-base';
import theme from '../theme';
import {locResultsByMedia} from '../data/data';

function LocResultsScreen({route, navigation}) {
  /*Get the params */
  const {name, mediaId, description} = route.params;
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
    <Center>
      <Pressable
        rounded="lg"
        onPress={() => navigation.navigate('Location', {fullItem})}>
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
            borderWidth={3}
            borderColor="white"
            height={100}
            borderRadius={100}
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
      </Pressable>
    </Center>
  );

  // Process each item of the data array
  const renderItem = ({item}) => (
    //JSON.parse(item['Media id']).includes(mediaId) ? <Item name={item.Name} fullItem={item} /> : null
    <Item name={item.name} fullItem={item} />
  );

  const renderHeader = () => (
    <View mt="3" style={styles.media} rounded="xl">
      <Text
        fontSize="3xl"
        isTruncated
        textAlign="left"
        multiline={true}
        numberOfLines={3}>
        <Text bold>{name}</Text>
      </Text>
      <Text fontSize="lg" textAlign="justify">
        {description}
      </Text>
    </View>
  );

  return (
    <NativeBaseProvider theme={theme}>
      <FlatList
        data={DATA}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}></FlatList>
    </NativeBaseProvider>
  );
}

export default LocResultsScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  media: {
    backgroundColor: '#e6e9ed',
    padding: 20,
    marginVertical: 2,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#3b81f6',
    padding: 20,
    marginVertical: 2,
    marginHorizontal: 16,
  },
});
