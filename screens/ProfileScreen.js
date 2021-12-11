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
import {ProfileGalleryNav} from './ProfileGalleryNav';
import {retrieveUserSession} from '../data/secureStorage';

function ProfileScreen({navigation}) {
  const {user, signUp, signOut} = useAuth();
  //Find additional functions on the user object
  //console.log(Object.getOwnPropertyNames(user).forEach( (props) => console.log(props)));
  const userInfo = JSON.parse(user._customData);
  //console.log(user.identities);

  useEffect(() => {
    testUserToken();
  }, []);

  const testUserToken = async () => {
    const userData = await retrieveUserSession();
    console.log('SECURE STORAGE:', userData);
    const nowTime = new Date();
    const thenTime = new Date(userData['timestamp']);
    const maxDiff = 86400000 * 0.5; //Days in milliseconds * number of days to refresh token
    if (nowTime.getTime() - thenTime.getTime() > maxDiff) {
      console.log('====== NEED TO REFRESH TOKEN AFTER HALF DAY ======');
    }
  };

  const [DATA, setDATA] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await photosByUser(user.id);
      setDATA(data);
    }
    fetchData();
  }, [refresh]);

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
