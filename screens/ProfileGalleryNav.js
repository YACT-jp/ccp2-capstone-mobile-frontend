import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  useColorScheme,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from 'react-native';
import {
  Heading,
  Button,
  Image,
  Box,
  Modal,
  VStack,
  HStack,
  Pressable,
  Input,
  ArrowBackIcon,
  ArrowForwardIcon,
} from 'native-base';
import {useAuth, AuthProvider} from '../providers/AuthProvider';
import {photosByUser} from '../data/data';

function ProfileGalleryNav() {
  const [showModal, setShowModal] = useState(false);
  const [singlePhoto, setSinglePhoto] = useState(); // passes only URL
  const [currentPhoto, setCurrentPhoto] = useState(); // passes entire photo object
  const [currentIndex, setCurrentIndex] = useState();
  const [singleDescription, setSingleDescription] = useState('No description');

  /** update photo url for singlePhoto modal */
  useEffect(() => {
    if (currentIndex !== undefined) {
      setSinglePhoto(DATA[`${currentIndex}`]['url']);
      setSingleDescription(DATA[`${currentIndex}`]['description']);
    }
  }, [currentIndex]);

  /** update photo url for singlePhoto modal */
  const handleClick = (event, url, item) => {
    setShowModal(true);
    setSinglePhoto(url);
    setCurrentPhoto(item);
    setCurrentIndex(DATA.indexOf(item));
    event.preventDefault();
  };

  const lastPhoto = (event, item) => {
    if (currentIndex === 0) {
      setCurrentIndex(DATA.length - 1);
      setSinglePhoto(DATA[`${currentIndex}`]['url']);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
    console.log('singlePhoto', singlePhoto);
    console.log('currentIndex', currentIndex);
    event.preventDefault();
  };

  const nextPhoto = (event, item) => {
    if (currentIndex === DATA.length - 1) {
      setCurrentIndex(0);
      setSinglePhoto(DATA[0]['url']);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
    console.log('singlePhoto', singlePhoto);
    console.log('currentIndex', currentIndex);
    event.preventDefault();
  };

  /** DELETE request sending imageUri to backend */
  const deleteImage = async () => {
    const url = `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/photo/${currentPhoto._id}`;
    return await fetch(url, {
      method: 'DELETE',
    })
      .then(response => response.text())
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.warn(error);
      });
  };

  const SinglePhoto = (item, DATA) => (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content size="lg">
        <Modal.CloseButton />
        <Modal.Header>Your Image Gallery</Modal.Header>
        <Modal.Body space={5} alignItems="center">
          <HStack space={5} alignItems="center" justifyContent="center">
            <ArrowBackIcon onPress={(event, item) => lastPhoto(event, item)} />
            <Image
              border={1}
              borderWidth={5}
              borderColor="white"
              source={{
                uri: singlePhoto,
              }}
              alt="Alternate Text"
              size="2xl"
            />
            <ArrowForwardIcon
              onPress={(event, item) => nextPhoto(event, item)}
            />
          </HStack>
          {singleDescription ? (
            <Text>{singleDescription}</Text>
          ) : (
            <Text>No description</Text>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setShowModal(false);
              }}>
              Back
            </Button>
            <Button
              colorScheme="blue"
              onPress={() => {
                setShowModal(false);
                deleteImage();
              }}>
              Delete
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default ProfileGalleryNav;
