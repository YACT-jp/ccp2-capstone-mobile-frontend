import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {
  Modal,
  Button,
  Image,
  HStack,
  ArrowBackIcon,
  ArrowForwardIcon,
} from 'native-base';
import {deletePhoto} from '../../data/data';
import {retrieveUserSession} from '../data/secureStorage';

function ProfileGalleryNav(props) {
  const [singlePhoto, setSinglePhoto] = useState(props.singlePhoto); // passes only URL
  const [currentIndex, setCurrentIndex] = useState(props.currentIndex);
  const [singleDescription, setSingleDescription] = useState('No description');
  const [deleteId, setDeleteId] = useState(props.initialDeleteId); // passes photo object id to delete

  /** update photo url for singlePhoto modal */
  useEffect(() => {
    if (currentIndex !== undefined) {
      setSinglePhoto(props.DATA[`${currentIndex}`]['url']);
      setSingleDescription(props.DATA[`${currentIndex}`]['description']);
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
      <Modal.Header>Your Image Gallery</Modal.Header>
      <Modal.Body space={5} alignItems="center">
        <HStack space={5} alignItems="center" justifyContent="center">
          <ArrowBackIcon onPress={event => lastPhoto(event)} />
          <Image
            border={1}
            borderWidth={5}
            borderColor="white"
            source={{
              uri: singlePhoto,
            }}
            key={singlePhoto}
            alt="Alternate Text"
            size="2xl"
          />
          <ArrowForwardIcon onPress={event => nextPhoto(event)} />
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
              props.setShowModal(false);
            }}>
            Back
          </Button>
          <Button
            colorScheme="blue"
            onPress={async () => {
              props.setShowModal(false);
              let results = await deletePhoto(deleteId);
              console.log(results);
              props.setRefresh(!props.refresh);
            }}>
            Delete
          </Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  );
}

export default ProfileGalleryNav;
