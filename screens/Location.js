import React, {useEffect, useState} from 'react';
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
import {
  getAsyncSavedLocations,
  updateAsyncSavedLocations,
} from '../data/asyncSavedLocations';
import {dynamicSavedLocationsApi} from '../data/data';
import {cloneNode} from '@babel/types';

function Location({route, navigation}) {
  /*Get the params */
  const {fullItem} = route.params;
  const {location_pic, name, description} = fullItem;
  const coordsObj = eval('(' + fullItem['coordinates'] + ')');
  const {user} = useAuth();
  const [isLocationSaved, setIsLocationSaved] = useState(false);
  const [refresh, setRefresh] = useState(false);

  /** onClick function that saves location */
  const onSaveClick = () => {
    const fetchSaveData = async () => {
      const res = await dynamicSavedLocationsApi(user.id, fullItem, 'patch');
      console.log('save res', res)
      await updateAsyncSavedLocations(user.id);
      setIsLocationSaved(true);
    };
    setRefresh(!refresh);
    fetchSaveData();
  };

  /** onClick function that deletes location */
  const onDeleteClick = () => {
    const fetchDelData = async () => {
      const res = await dynamicSavedLocationsApi(user.id, fullItem, 'delete');
      console.log('delete res', res)
      await updateAsyncSavedLocations(user.id);
      setIsLocationSaved(false);
    };
    setRefresh(!refresh);
    fetchDelData();
  };

  /** load SavedLocations from AsyncStorage */
  useEffect(() => {
    async function fetchData() {
      try {
        const asyncSavedLocations = await getAsyncSavedLocations();
        const locationObject = asyncSavedLocations.find(
          location => location._id === fullItem._id,
        );
        if (locationObject !== undefined) {
          setIsLocationSaved(true);
        } else {
          setIsLocationSaved(false);
        }
      } catch (error) {
        throw error;
      }
    }
    fetchData();
  }, [refresh]);

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
                      uri: location_pic,
                    }}
                    alt="image"
                  />
                )}
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
                      {name}
                    </Heading>
                    {/* <Text
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
                    </Text> */}
                  </Stack>
                  <Text fontWeight="400">
                    {description === '' || description === null
                      ? 'No description yet.'
                      : description}
                  </Text>
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
                  {isLocationSaved ? (
                    <Button size="sm" onPress={onDeleteClick}>
                      Remove Location
                    </Button>
                  ) : (
                    <Button size="sm" onPress={onSaveClick}>
                      Save Location
                    </Button>
                  )}
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
