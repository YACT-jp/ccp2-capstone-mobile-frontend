import React from 'react';
import {
  Heading,
  Text,
  VStack,
  Box,
  Image,
  Center,
  NativeBaseProvider,
  AspectRatio,
  Stack,
  ScrollView,
  Button,
} from 'native-base';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useAuth} from '../providers/AuthProvider';

function Location({route, navigation}) {
  /*Get the params */
  const {fullItem} = route.params;
  const {location_pic} = fullItem;
  const coordsObj = eval('(' + fullItem['coordinates'] + ')');
  const {user, signUp, signIn} = useAuth();

  const bookmarkEndpoint = async inputdata => {
    console.log('input', inputdata);
    try {
      const response = await fetch(
        `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/user/${user.id}/bookmarks`,
        {
          method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
          // mode: 'cors', // no-cors, *cors, same-origin
          // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          // credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          // redirect: 'follow', // manual, *follow, error
          // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(inputdata), // body data type must match "Content-Type" header
        },
      );
      // console.log(response);
      const data = await response.text();
      return data;
    } catch (err) {
      console.log('error', err);
    }
  };

  const onSaveClick = () => {
    console.log('click');
    console.log('user', user.id);
    fetchData = async () => {
      const data = await bookmarkEndpoint(fullItem);
      console.log('bookmark data', data);
    };
    fetchData();
  };

  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Box flex="1" safeAreaTop>
          <ScrollView>
            <VStack space={4} alignItems="center">
              <AspectRatio w="100%" ratio={16 / 9}>
                {location_pic === '' || location_pic === null ? (
                  <Center flex="1">
                    <Text fontWeight="400">No Image yet</Text>
                  </Center>
                ) : (
                  <Image
                    source={{
                      uri: fullItem.location_pic,
                    }}
                    alt="image"
                  />
                )}
                {/* <Image
                  source={{
                    uri: fullItem.location_pic,
                  }}
                  alt="image"
                /> */}
              </AspectRatio>
              <Box
                safeArea
                w="80"
                maxW="80"
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1"
                p="2"
                py="8"
                _dark={{
                  borderColor: 'coolGray.600',
                  backgroundColor: 'gray.700',
                }}
                _web={{
                  shadow: 2,
                  borderWidth: 0,
                }}
                _light={{
                  backgroundColor: 'gray.50',
                }}>
                <Stack p="4" space={3}>
                  <Stack space={2}>
                    <Heading size="md" ml="-1">
                      {fullItem.name}
                    </Heading>
                    <Text
                      fontSize="xs"
                      _light={{
                        color: 'violet.500',
                      }}
                      _dark={{
                        color: 'violet.400',
                      }}
                      fontWeight="500"
                      ml="-0.5"
                      mt="-1">
                      {`Media Name`}
                    </Text>
                  </Stack>
                  <Text fontWeight="400">{fullItem.description}</Text>
                  <Box
                    flex={1}
                    justifyContent="flex-end"
                    rounded="lg"
                    overflow="hidden"
                    alignItems="center"
                    justifyContent="center">
                    <AspectRatio w="100%" ratio={16 / 9}>
                      <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={mapStyles.map}
                        region={{
                          latitude: parseFloat(coordsObj['latitude']),
                          longitude: parseFloat(coordsObj['longitude']),
                          latitudeDelta: 0.015,
                          longitudeDelta: 0.0121,
                        }}>
                        <Marker
                          key={0}
                          coordinate={{
                            latitude: parseFloat(coordsObj['latitude']),
                            longitude: parseFloat(coordsObj['longitude']),
                          }}
                          // title={marker.title}
                          // description={marker.description}
                        />
                      </MapView>
                    </AspectRatio>
                  </Box>
                  <Button size="sm" onPress={onSaveClick}>
                    Save Location
                  </Button>
                </Stack>
              </Box>
            </VStack>
          </ScrollView>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}

const mapStyles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
  },
});

export default Location;
