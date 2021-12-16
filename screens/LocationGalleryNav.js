import React, {useState, useEffect} from 'react';
import {
  Text,
  Box,
  Image,
  Stack,
  Heading,
  HStack,
  VStack,
  ArrowBackIcon,
  ArrowForwardIcon,
} from 'native-base';
import {retrieveUserSession} from '../data/secureStorage';
import {getUser, getLocation} from '../data/data';
import {getDisplayDate} from '../data/dateUtils';

function LocationGalleryNav(props) {
  const [currentIndex, setCurrentIndex] = useState(props.currentIndex);
  const [displayPhoto, setDisplayPhoto] = useState(props.displayPhoto);
  const [displayDescription, setDisplayDescription] =
    useState('No description');
  const [displayUsername, setDisplayUsername] = useState();
  const [displayLocation, setDisplayLocation] = useState();
  const [displayTimestamp, setDisplayTimestamp] = useState();

  /** API call for photo user and location */
  useEffect(() => {
    async function fetchData() {
      if (currentIndex !== undefined) {
        let user = await getUser(props.DATA[`${currentIndex}`]['user_id']);
        setDisplayUsername(user[0]['username']);
        let location = await getLocation(
          props.DATA[`${currentIndex}`]['location_id'],
        );
        setDisplayLocation(location[0]['name']);
        setDisplayTimestamp(
          getDisplayDate(props.DATA[`${currentIndex}`]['timestamp']),
        );
      }
    }
    fetchData();
  }, [currentIndex]);

  /** update photo url for displayPhoto modal */
  useEffect(() => {
    if (currentIndex !== undefined) {
      console.log(props.DATA[`${currentIndex}`]);
      setDisplayPhoto(props.DATA[`${currentIndex}`]['url']);
      setDisplayDescription(props.DATA[`${currentIndex}`]['description']);
    }
  }, [currentIndex]);

  const lastPhoto = event => {
    if (currentIndex === 0) {
      setCurrentIndex(props.DATA.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
    event.preventDefault();
  };

  const nextPhoto = event => {
    if (currentIndex === props.DATA.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
    event.preventDefault();
  };

  return (
    <VStack alignItems="flex-start">
      <HStack space={5} alignItems="center" justifyContent="center">
        <ArrowBackIcon onPress={event => lastPhoto(event)} />
        <Image
          border={1}
          borderWidth={5}
          borderColor="white"
          source={{
            uri: displayPhoto,
          }}
          key={displayPhoto}
          alt="Alternate Text"
          size="2xl"
        />
        <ArrowForwardIcon onPress={event => nextPhoto(event)} />
      </HStack>
      <Box
        ml="15%"
        color="coolGray.600"
        _dark={{
          color: 'warmGray.200',
        }}
        fontWeight="400">
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md">{displayUsername}</Heading>
          </Stack>
          <Text fontWeight="400">
            {displayDescription ? (
              <Text>{displayDescription}</Text>
            ) : (
              <Text>No description</Text>
            )}
          </Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}
                fontWeight="400">
                {displayTimestamp}
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </VStack>
  );
}

export default LocationGalleryNav;
