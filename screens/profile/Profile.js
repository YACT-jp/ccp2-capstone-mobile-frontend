import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  useColorScheme,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from 'react-native';
import {Heading, Button, Image, Box, Modal, Pressable} from 'native-base';
import {useAuth, AuthProvider} from '../providers/AuthProvider';
import {photosByUser, deletePhoto} from '../data/data';
import ProfileGalleryNav from './ProfileGalleryNav';
import {retrieveUserSession} from '../data/secureStorage';

function ProfileScreen({navigation}) {
  const {user, signUp, signOut} = useAuth();
  //Find additional functions on the user object
  //console.log(Object.getOwnPropertyNames(user).forEach( (props) => console.log(props)));
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

  const [DATA, setDATA] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [singlePhoto, setSinglePhoto] = useState(); // passes only URL
  const [currentIndex, setCurrentIndex] = useState();
  const [deleteId, setDeleteId] = useState(); // passes photo object id to delete

  useEffect(() => {
    async function fetchData() {
      const data = await photosByUser(user.id);
      setDATA(data);
    }
    fetchData();
  }, [refresh]);

  /** update photo url for singlePhoto modal */
  const handleClick = (event, url, item) => {
    setShowModal(true);
    setSinglePhoto(url);
    setDeleteId(item._id);
    setCurrentIndex(DATA.indexOf(item));
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
            navigation.navigate('Edit Profile');
          }}>
          Edit Profile
        </Button>
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
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content size="lg">
          <Modal.CloseButton />
          <Modal.Header>Your Image Gallery</Modal.Header>
          <Modal.Body space={5} alignItems="center">
            <ProfileGalleryNav
              DATA={DATA}
              item={singlePhoto}
              showModalInit={showModal}
              singlePhoto={singlePhoto}
              currentIndex={currentIndex}
              deleteId={deleteId}
              setDeleteId={setDeleteId}
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
                onPress={async () => {
                  setShowModal(false);
                  let results = await deletePhoto(deleteId);
                  console.log(results);
                }}>
                Delete
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
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
