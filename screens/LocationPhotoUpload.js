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
} from 'native-base';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {retrieveUserSession} from '../data/secureStorage';
import {useAuth} from '../providers/AuthProvider';

function LocationPhotoUpload(props) {
  const {user} = useAuth();
  const [imageUri, setImageUri] = useState();
  const [dispImageUri, setDispImageUri] = useState();
  const [photoDescription, setPhotoDescription] = useState();

  /** Image Picker via camera access */
  const openCamera = () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
        cameraType: 'back',
        allowsEditing: true,
        noData: true,
      },
      includeBase64: true,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImageUri(response.assets[0].uri);
        setDispImageUri(response.assets[0].uri);
      }
    });
  };

  /** Image Picker via library access */
  const openLibrary = () => {
    const options = {
      storageOptions: {
        quality: 1,
        mediaType: 'photo',
        cameraType: 'back',
        allowsEditing: true,
        noData: true,
        maxWidth: 8000,
        maxHeight: 8000,
      },
    };

    launchImageLibrary(options, response => {
      // console.log('response: ', response);
      // console.log('response latitude: ', response.latitude);
      // console.log('response longitude: ', response.longitude);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const uri = response.assets[0].uri;
        setImageUri(response.assets[0].uri);
        setDispImageUri(response.assets[0].uri);
      }
    });
  };

  /** POST request sending imageUri to backend */
  const postImage = async (imageUri, photoDescription) => {
    const userToken = await retrieveUserSession();
    const url = `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/user/${user.id}/location/${props.locationId}/photo`;
    let formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      name: 'image.jpg',
      type: 'image/jpeg',
    });
    formData.append('description', photoDescription);
    try {
      return await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userToken['token']}`,
        },
        body: formData,
      });
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <Modal.Content size="xs">
      <Modal.CloseButton />
      <Modal.Header>New Post</Modal.Header>
      <Modal.Body>
        <HStack space={5} alignItems="center" justifyContent="center">
          <Image
            border={1}
            borderWidth={5}
            borderColor="white"
            source={{
              uri: dispImageUri,
            }}
            key={dispImageUri}
            alt="Alternate Text"
            size="xl"
          />
          <VStack space={5}>
            <Button
              colorScheme="blue"
              size="md"
              onPress={() => {
                openCamera();
              }}>
              Take Photo
            </Button>
            <Button
              colorScheme="blue"
              size="md"
              onPress={() => {
                openLibrary();
              }}>
              Choose From Library
            </Button>
          </VStack>
        </HStack>
        <Input
          onChangeText={text => setPhotoDescription(text)}
          value={photoDescription}
          height="30%"
          placeholder="Add a description..."
          mt="2"
          paddingLeft="3"
          rounded="lg"
          borderWidth="5"
          style={{borderColor: '#3b81f6', fontSize: 15}}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button
            variant="ghost"
            colorScheme="blueGray"
            onPress={event => {
              props.setShowModal(false);
              event.preventDefault();
            }}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onPress={event => {
              props.setShowModal(false),
                // setPhotoDescription(photoDescription),
                console.log('photoDescription', photoDescription),
                postImage(imageUri, photoDescription),
                setTimeout(() => {
                  props.setGalleryRefresh(!props.galleryRefresh);
                }, 1000);
              event.preventDefault();
            }}>
            Post
          </Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  );
}

export default LocationPhotoUpload;
