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
  FormControl,
  Modal,
  HStack,
  Input,
  FlatList,
  Pressable,
  ArrowBackIcon,
  ArrowForwardIcon,
  Icon,
} from 'native-base';
import {View, StyleSheet, ImageBackground} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { getHeaderTitle } from '@react-navigation/elements';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useAuth} from '../providers/AuthProvider';
import {
  getAsyncSavedLocations,
  updateAsyncSavedLocations,
} from '../data/asyncSavedLocations';
import {dynamicSavedLocationsApi, photosByLocation} from '../data/data';
import {cloneNode} from '@babel/types';
import {retrieveUserSession} from '../data/secureStorage';
import LocationPhotoUpload from './LocationPhotoUpload';
import LocationGalleryNav from './LocationGalleryNav';

function Location({route, navigation}) {
  /*Get the params */
  const {fullItem} = route.params;
  const {location_pic, name, description} = fullItem;
  const locationId = fullItem._id;
  const coordsObj = eval('(' + fullItem['coordinates'] + ')');
  const {user} = useAuth();
  const [isLocationSaved, setIsLocationSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [photoData, setPhotoData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [galleryRefresh, setGalleryRefresh] = useState(false);
  const [showSinglePhoto, setShowSinglePhoto] = useState(false);
  const [singlePhoto, setSinglePhoto] = useState();
  const [singleDescription, setSingleDescription] = useState();
  const [currentIndex, setCurrentIndex] = useState();

  /** onClick function that saves location */
  const onSaveClick = () => {
    const fetchSaveData = async () => {
      const res = await dynamicSavedLocationsApi(user.id, fullItem, 'patch');
      console.log('save res', res);
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
      console.log('delete res', res);
      await updateAsyncSavedLocations(user.id);
      setIsLocationSaved(false);
    };
    setRefresh(!refresh);
    fetchDelData();
  };

  /** Style the header with data */
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () =>
        <View>
            <Text fontWeight="bold" fontSize="lg">{name}</Text>
            <Text>{fullItem.media_name || ''}</Text>
        </View>,
        headerRight: () => (
          <>
          {isLocationSaved ? (
                <MatIcon name="bookmark-check" size={40} color="#ff0000" onPress={onDeleteClick} />
            ) : (
                <MatIcon name="bookmark-off-outline" size={40} color="#dddddd"  onPress={onSaveClick} />
            )}
          </>
        )
    });
  }, [navigation, isLocationSaved]);

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

  /** get user photos for this location */
  useEffect(() => {
    async function fetchData() {
      const data = await photosByLocation(locationId);
      setPhotoData(data);
    }
    fetchData();
  }, [galleryRefresh]);

  /** update photo url for singlePhoto modal */
  const handleClick = (event, url, item) => {
    setShowSinglePhoto(true);
    setSinglePhoto(url);
    let index = photoData.findIndex(x => x._id === item._id);
    setCurrentIndex(index);
    event.preventDefault();
  };

  //List Item Component
  const Item = ({url, item}) => (
    <Pressable
      onPress={event => handleClick(event, url, item)}
      maxWidth="25%"
      height="100">
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
    </Pressable>
  );

  //Process each item of the data array for the list
  const renderItem = ({item}) => <Item url={item.url} item={item} />;

  // Header element for the scrolling Flatlist
  const _renderHeader = () => (
    <ScrollView>
      <VStack mb="4" alignItems="center">
        <AspectRatio w="100%" ratio={16 / 9}>
          {location_pic === '' || location_pic === null ? (
            <Center flex="1">
              <Text fontWeight="400">No Image yet</Text>
            </Center>
          ) : (
            <ImageBackground
              source={{
                uri: location_pic,
              }}
              alt="image">
                <Button colorScheme="blue" position="absolute" right="2" top="2" onPress={() => setShowModal(true)}>
                  <MatIcon name="camera-plus" size={25} color="#ffffff" />
                </Button>
              </ImageBackground>
          )}
        </AspectRatio>
        <Box
        safeArea
        w="100%"
        mt="0"
        mb="4"
        borderColor="coolGray.200"
        borderWidth="1"
        p="2"
        shadow="3"
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
          <Text fontWeight="400" mb="1">
            {description === '' || description === null
              ? 'No description yet.'
              : description}
          </Text>
          <>
          {fullItem.media_pics !== undefined && fullItem.media_pics.length > 0 && (
              <AspectRatio w="100%" ratio={16 / 9}>
                <Image
                  source={{
                    uri: fullItem.media_pics[0],
                  }}
                  alt={`Media pic from ${fullItem.media_name}`}
                />
              </AspectRatio>
            )}
          </>
        </Box>
        <Box
          safeArea
          w="90%"
          maxW="90%"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          p="2"
          pb="1"
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
          <Stack p="2" space={3}>
            <Box
              flex={1}
              justifyContent="flex-end"
              rounded="lg"
              overflow="hidden"
              alignItems="center"
              justifyContent="center">
              <AspectRatio w="100%" ratio={16 / 9}>
                <MapView
                  provider={PROVIDER_GOOGLE}
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
              <Button colorScheme="blue" size="md" onPress={onDeleteClick} 
                leftIcon={<Icon as={MatIcon} name="bookmark-minus"
                  _dark={{
                    color: "warmGray.50",
                  }}
                />}>
                 Remove Location         
              </Button>
            ) : (
              <Button colorScheme="blue" size="md" onPress={onSaveClick}
              leftIcon={<Icon as={MatIcon} name="bookmark-plus-outline"
                  _dark={{
                    color: "warmGray.50",
                  }}
                />}>
                Save Location
              </Button>
            )}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              <LocationPhotoUpload
                setShowModal={setShowModal}
                galleryRefresh={galleryRefresh}
                setGalleryRefresh={setGalleryRefresh}
                locationId={locationId}
              />
            </Modal>
          </Stack>
        </Box>
      </VStack>
      { photoData.length > 0 && <Heading><MatIcon name="image-multiple-outline" size={30} /> User Photo Gallery</Heading> }
    </ScrollView>
  );

  // Footer element for the scrolling Flatlist
  const _renderFooter = () => (
    <Button colorScheme="blue" w="90%" mx="5" my="2" onPress={() => setShowModal(true)}
      leftIcon={<Icon as={MatIcon} name="camera-plus"
          _dark={{
            color: "warmGray.50",
          }}
        />}>
      Add Your Own Photo
    </Button>
  );

  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Box flex="1" safeAreaTop>
          <FlatList
            ListHeaderComponent={() => _renderHeader()}
            ListFooterComponent={() => _renderFooter()}
            numColumns={4}
            key={4}
            data={photoData}
            renderItem={renderItem}
            style={{width: '100%'}}></FlatList>
          <Modal
            isOpen={showSinglePhoto}
            onClose={() => setShowSinglePhoto(false)}>
            <Modal.Content size="lg">
              <Modal.CloseButton />
              <Modal.Header>
                <Heading size="sm" multiline={true}>
                  {name} Image Gallery
                </Heading>
              </Modal.Header>
              <Modal.Body>
                <LocationGalleryNav
                  DATA={photoData}
                  showModalInit={showModal}
                  singlePhoto={singlePhoto}
                  currentIndex={currentIndex}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="ghost"
                    colorScheme="blueGray"
                    onPress={() => {
                      setShowSinglePhoto(false);
                    }}>
                    Back
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
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
