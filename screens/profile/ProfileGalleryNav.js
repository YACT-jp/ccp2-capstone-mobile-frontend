import React, {useState, useEffect} from 'react';
import {
  Text,
  Box,
  Heading,
  Stack,
  Modal,
  Button,
  Image,
  HStack,
  ArrowBackIcon,
  ArrowForwardIcon,
} from 'native-base';
import {deletePhoto, getUser, getLocation} from '../../data/data';
import {retrieveUserSession} from '../data/secureStorage';
import {getDisplayDate} from '../../data/dateUtils';

function ProfileGalleryNav(props) {
  const [currentIndex, setCurrentIndex] = useState(props.currentIndex);
  const [displayPhoto, setDisplayPhoto] = useState(props.displayPhoto);
  const [displayDescription, setDisplayDescription] =
    useState('No description');
  const [displayUsername, setDisplayUsername] = useState();
  const [displayLocation, setDisplayLocation] = useState();
  const [displayTimestamp, setDisplayTimestamp] = useState();
  const [deleteId, setDeleteId] = useState(props.initialDeleteId);
  const [deleteModal, setDeleteModal] = useState(false);

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
      setDisplayPhoto(props.DATA[`${currentIndex}`]['url']);
      setDisplayDescription(props.DATA[`${currentIndex}`]['description']);
      setDeleteId(props.DATA[`${currentIndex}`]['_id']);
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
    <Modal.Content size="lg">
      <Modal.CloseButton />
      <Modal.Header>My Image Gallery</Modal.Header>
      <Modal.Body>
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
              <Heading size="md">{displayLocation}</Heading>
            </Stack>
            <Text fontWeight="400">
              <Text fontWeight="400">
                {displayDescription === '' ||
                displayDescription === null ||
                displayDescription === 'undefined' ? (
                  <Text>No description</Text>
                ) : (
                  <Text>{displayDescription}</Text>
                )}
              </Text>
            </Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
              fontWeight="400">
              {displayTimestamp}
            </Text>
          </Stack>
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button
            variant="ghost"
            colorScheme="blueGray"
            onPress={() => {
              props.setShowModal(false);
            }}>
            Back
          </Button>
          <Button colorScheme="blue" onPress={() => setDeleteModal(true)}>
            Delete
          </Button>
          <Modal isOpen={deleteModal} onClose={() => setDeleteModal(false)}>
            <Modal.Content size="2xs" maxW="250" maxH="130">
              <Box
                alignItems="center"
                justifyContent="center"
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}
                fontWeight="400">
                <Stack p="4" space={2}>
                  <Heading size="md">Are you sure?</Heading>
                  <Text>This action can't be undone.</Text>
                </Stack>
                <Button.Group space={2} alignItems="center">
                  <Button
                    variant="ghost"
                    colorScheme="blueGray"
                    onPress={() => {
                      props.setShowModal(false);
                    }}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="blue"
                    onPress={async () => {
                      props.setShowModal(false);
                      let results = await deletePhoto(deleteId);
                      console.log(results);
                      props.setRefresh(!props.refresh);
                    }}>
                    Delete Photo
                  </Button>
                </Button.Group>
              </Box>
            </Modal.Content>
          </Modal>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  );
}

export default ProfileGalleryNav;
