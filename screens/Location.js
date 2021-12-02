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
  FlatList,
} from 'native-base';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useAuth} from '../providers/AuthProvider';
import { photosByLocation } from '../data/data';

function Location({route, navigation}) {
  /*Get the params */
  const {fullItem} = route.params;
  const {location_pic, name, description} = fullItem;
  const locationId = fullItem._id;
  const coordsObj = eval('(' + fullItem['coordinates'] + ')');
  const {user, signUp, signIn} = useAuth();
  const [userSavedLocation, setUserSavedLocation] = useState([]);
  const [isLocationSaved, setIsLocationSaved] = useState(false);
  const [photoData, setPhotoData] = useState([]);

  /** will move fetch functions to data.js */

  /** fetch for PATCH and DELETE */
  const bookmarkEndpoint = async (inputdata, method) => {
    try {
      const response = await fetch(
        `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/user/${user.id}/bookmarks`,
        {
          method: method.toUpperCase(), // *GET, POST, PUT, DELETE, etc.
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
      const data = await response.text();
      return data;
    } catch (err) {
      console.log('error', err);
    }
  };

  /** fetch for GET */
  const getBookmarkEndpoint = async () => {
    try {
      const response = await fetch(
        `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/user/${user.id}/bookmarks`,
        {
          method: 'GET',
        },
      );
      const data = await response.text();
      return data;
    } catch (err) {
      console.log('error', err);
    }
  };

  /** onClick function that saves location */
  const onSaveClick = () => {
    console.log('save click');
    fetchData = async () => {
      const data = await bookmarkEndpoint(fullItem, 'patch');
    };
    fetchData();
    fetchBookmarkData();
  };

  /** onClick function that deletes location */
  const onDeleteClick = () => {
    console.log('delete click');
    fetchData = async () => {
      const data = await bookmarkEndpoint(fullItem, 'delete');
    };
    fetchData();
    fetchBookmarkData();
  };

  /** async function for fetching saved locations used by onClick functions */
  async function fetchBookmarkData() {
    const data = await getBookmarkEndpoint('get');
    setUserSavedLocation(JSON.parse(data)[0].bookmarks);
  }

  /** compare saved locations if already saved */
  const checkIfLocationIsSaved = () => {
    const locationObject = userSavedLocation.find(
      location => location._id === fullItem._id,
    );
    if (locationObject !== undefined) {
      setIsLocationSaved(true);
    } else {
      setIsLocationSaved(false);
    }
  };

  /** use effect for initial load only */
  useEffect(() => {
    fetchBookmarkData();
    checkIfLocationIsSaved();
  }, []);

  /** use effect for every updated of userSavedLocation */
  useEffect(() => {
    checkIfLocationIsSaved();
  }, [userSavedLocation]);

  
  /** get user photos for this location */
  useEffect( () => {
    async function fetchData() {
      const data = await photosByLocation(locationId);
      setPhotoData(data);
    }
    fetchData();
  }, []);

  //List Item Component 
  const Item = ({ url }) => (
    <Box maxWidth="25%" height="100">
      <Image
        source={{
          uri: url,
        }}
        alt="Alternate Text"
        maxHeight="100%"
        minWidth="100%"
        objectFit="contain"
        align="bottom"
        height="200"
      />
    </Box>
  );

  //Process each item of the data array for the list
  const renderItem = ({ item }) => (<Item url={item.url} />);

  // Header element for the scrolling Flatlist 
    const _renderHeader = () => <ScrollView>
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

  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Box flex="1" safeAreaTop>
          
          <FlatList
          ListHeaderComponent={() => _renderHeader()}
          numColumns={4}
          key={4}
          data={photoData}
          renderItem={renderItem}
          style={{ width: '100%' }}
          >
          </FlatList>
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
