import React, {useState, useEffect, useCallback} from 'react';
import {Text, FlatList, StyleSheet} from 'react-native';
import {
  NativeBaseProvider,
  Center,
  Stack,
  Heading,
  Button,
  Image,
  Box,
  Modal,
  HStack,
  Pressable,
  ArrowBackIcon,
  ArrowForwardIcon,
} from 'native-base';
import {useFocusEffect} from '@react-navigation/core';
import {useAuth} from '../../providers/AuthProvider';
import {photosByUser, getProfile} from '../../data/data';
import {retrieveUserSession} from '../../data/secureStorage';

function ProfileScreen({navigation}) {
  //Find additional functions on the user object
  //console.log(Object.getOwnPropertyNames(user).forEach( (props) => console.log(props)));

  const {user} = useAuth();
  const userInfo = JSON.parse(user._customData);
  //console.log(user.identities);

  // TODO LATER: Remove this useEffect and testUserToken once functionality is confirmed
  useEffect(() => {
    testUserToken();
  }, []);

  const testUserToken = async () => {
    const userData = await retrieveUserSession();
    console.log('SECURE STORAGE:', userData);
    const nowTime = new Date();
    if(!userData) console.log('ERROR-No userData');
    if(!userData["timestamp"]) console.log('ERROR-No timestamp in userData');
    if(userData && userData["timestamp"]) {
      const thenTime = new Date(userData["timestamp"]);
      const maxDiff = 86400000 * 0.5; //Days in milliseconds * number of days to refresh token
      if (nowTime.getTime() - thenTime.getTime() > maxDiff) {
        console.log ('====== NEED TO REFRESH TOKEN AFTER HALF DAY ======');
      }   
    }
  };
  const {username, email, bio} = userInfo;

  const [DATA, setDATA] = useState([]);
  const [profileData, setProfileData] = useState({username, email, bio});
  const [showModal, setShowModal] = useState(false);
  const [singlePhoto, setSinglePhoto] = useState(); // passes only URL
  const [currentIndex, setCurrentIndex] = useState();
  const [deleteId, setDeleteId] = useState(); // passes photo object id to delete

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        const data = await photosByUser(user.id);
        setDATA(data);
        const profData = await getProfile(user.id);
        setProfileData(profData[0]);
      }
      fetchData();
      return () => {
        console.log('unmount my profile');
      };
    }, []),
  );

  /** update photo url for singlePhoto modal */
  const handleClick = (event, url, item) => {
    setShowModal(true);
    setSinglePhoto(url);
    setDeleteId(item._id);
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

  //Process each item of the data array
  const renderItem = ({item}) => <Item url={item.url} item={item} />;

  /** DELETE request sending imageUri to backend */
  const deleteImage = (imageUri, photoDescription) => {
    const url = `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/photo/${currentPhoto._id}`;
    let formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      name: 'image.jpg',
      type: 'image/jpeg',
    });
    formData.append('description', photoDescription);
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    }).catch(error => {
      console.warn(error);
    });
  };

  // Header element for the scrolling Flatlist
  const _renderHeader = () => (
    <Stack p="8" space={3}>
      <Stack space={2}>
        <Heading size="md" ml="-1">
        {profileData.username === null || profileData.username === undefined
          ? username
          : profileData.username}
        </Heading>
      </Stack>
      <Text fontWeight="400">
        {profileData.bio === null || profileData.bio === undefined
          ? bio
          : profileData.bio}
      </Text>
      <Box
        flex={1}
        justifyContent="flex-end"
        rounded="lg"
        overflow="hidden"
        alignItems="center"
        justifyContent="center"></Box>
      <HStack>
        <Button
          w="100%"
          colorScheme="blue"
          size="md"
          onPress={() => {
            navigation.navigate('Edit Profile', profileData);
          }}>
          Edit Profile
        </Button>
      </HStack>
    </Stack>
  );

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
                console.log(currentPhoto._id);
                // postImage(imageUri),
                // setTimeout(() => {
                //   setGalleryRefresh(!galleryRefresh);
                // }, 1000);
              }}>
              Delete
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );

  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <FlatList
          ListHeaderComponent={() => _renderHeader()}
          numColumns={4}
          key={4}
          data={DATA}
          renderItem={renderItem}
          style={{paddingHorizontal: 4, width: '100%'}}></FlatList>
        <SinglePhoto />
      </Center>
    </NativeBaseProvider>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
