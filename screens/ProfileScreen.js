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
import {photosByUser, authTest } from '../data/data';

function ProfileScreen({navigation}) {
  const {user, signUp, signOut} = useAuth();
  //Find additional functions on the user object
  //console.log(Object.getOwnPropertyNames(user).forEach( (props) => console.log(props)));
  const userInfo = JSON.parse(user._customData);
  //console.log(user.identities);

  useEffect(() => {
    testUserToken();
  }, [])

  const testUserToken = async () => {
    const userData = await authTest();
    console.log('AUTH TEST:', userData);
  }

  const [DATA, setDATA] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [singlePhoto, setSinglePhoto] = useState();
  const [currentIndex, setCurrentIndex] = useState();

  useEffect(() => {
    async function fetchData() {
      const data = await photosByUser(user.id);
      setDATA(data);
    }
    fetchData();
  }, [refresh]);

  /** update photo url for singlePhoto modal */
  useEffect(() => {
    if (currentIndex !== undefined) {
      setSinglePhoto(DATA[`${currentIndex}`]['url']);
    }
  }, [currentIndex]);

  /** update photo url for singlePhoto modal */
  const handleClick = (event, url, item) => {
    setShowModal(true);
    setSinglePhoto(url);
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

  const isDarkMode = useColorScheme() === 'dark';

  // Header element for the scrolling Flatlist
  const _renderHeader = () => (
    <View style={styles.container}>
      <Box
        safeArea
        w="100%"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        p="2"
        my="2"
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
        <Heading>My Profile</Heading>
        <Text>Username: {userInfo.username}</Text>
        <Text>Bio: {userInfo.bio}</Text>
        <Button
          colorScheme="blue"
          size="md"
          onPress={() => {
            signOut();
          }}>
          Sign Out
        </Button>
      </Box>
      <Heading alignSelf="flex-start">My Pics</Heading>
    </View>
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

  //Process each item of the data array
  const renderItem = ({item}) => <Item url={item.url} item={item} />;

  const SinglePhoto = (item, DATA) => (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content size="lg">
        <Modal.CloseButton />
        <Modal.Header>Image Gallery</Modal.Header>
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
          <Input
            placeholder="Add a caption..."
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
              onPress={() => {
                setShowModal(false);
              }}>
              Back
            </Button>
            <Button
              colorScheme="blue"
              onPress={() => {
                setShowModal(false);
                // postImage(imageUri),
                // setTimeout(() => {
                //   setGalleryRefresh(!galleryRefresh);
                // }, 1000);
              }}>
              Edit
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );

  return (
    <View
      style={{
        backgroundColor: isDarkMode ? '#000' : '#fff',
        flex: 1,
        alignItems: 'center',
        width: '100%',
      }}>
      <FlatList
        ListHeaderComponent={() => _renderHeader()}
        numColumns={4}
        key={4}
        data={DATA}
        renderItem={renderItem}
        style={{paddingHorizontal: 4, width: '100%'}}></FlatList>
      <SinglePhoto />
      <Button
        position="absolute"
        margin="2"
        colorScheme="blue"
        size="md"
        left="0"
        bottom="0"
        right="0"
        onPress={() => {
          setRefresh(!refresh);
        }}>
        Refresh Gallery
      </Button>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
