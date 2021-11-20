import React from 'react';
import {View, Button, StyleSheet, useColorScheme} from 'react-native';
import {
  Heading,
  Text,
  VStack,
  ZStack,
  Box,
  Image,
  Center,
  NativeBaseProvider,
  useColorModeValue,
} from 'native-base';
import MapView from 'react-native-maps';

export function LocationImage() {
  return (
    <Image
      size={150}
      resizeMode={'contain'}
      borderRadius={100}
      source={{
        uri: 'https://wallpaperaccess.com/full/317501.jpg',
      }}
      alt="Alternate Text"
    />
  );
}

function Location({route, navigation}) {
  /*Get the params */
  const {fullItem} = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  console.log(fullItem);
  return (
    //   <View
    //   style={{
    //     backgroundColor: isDarkMode ? '#000' : '#fff',
    //   }}>
    //     <Text>Detailed Location Info</Text>
    //     <Text>{fullItem.name}</Text>
    //     <Text>{fullItem._id}</Text>
    //     <Text>{fullItem.plus_code}</Text>
    //     <Button title="Go back" onPress={() => navigation.goBack()} />
    // </View>
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <View
          style={{
            backgroundColor: isDarkMode ? '#000' : '#fff',
            flex: 1,
            padding: 20,
          }}>
          <Heading></Heading>
          <Center flex={1} px="3">
            <LocationImage />
          </Center>
          <View style={{flex: 4}}>
            <Box
              width={72}
              bg={useColorModeValue('gray.50', 'gray.700')}
              shadow={1}>
              <VStack
                space={1}
                alignItems="center"
                justifyItems="center"
                mt={3}>
                <Text></Text>
                <Heading textAlign="center">{fullItem.name}</Heading>
                {/* <Text>{fullItem.description}</Text> */}
                <Text textAlign="center" padding="5">
                  Shinjuku Station is a major railway station in the Shinjuku
                  and Shibuya wards in Tokyo, Japan. In Shinjuku, it is part of
                  the Nishi-Shinjuku and Shinjuku districts. In Shibuya, it is
                  located in the Yoyogi and Sendagaya districts. It is the
                  world's busiest railway station.
                </Text>
                <Text>{fullItem['Plus Code']}</Text>
                <Button title="Go back" onPress={() => navigation.goBack()} />
              </VStack>
            </Box>
          </View>
          <MapView
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
      </Center>
    </NativeBaseProvider>
  );
}

export default Location;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     //marginTop: StatusBar.currentHeight || 0,
//   },
//   item: {
//     backgroundColor: '#f9c2ff',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   name: {
//     fontSize: 32,
//   },
// });
