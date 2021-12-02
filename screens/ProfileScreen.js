import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  useColorScheme,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from 'react-native';
import {
  Heading,
  Image,
  Box,
} from "native-base";
import {useAuth, AuthProvider} from '../providers/AuthProvider';
import { photosByUser } from '../data/data'

function ProfileScreen({navigation}) {
  const {user, signUp, signOut} = useAuth();
  //Find additional functions on the user object
  //console.log(Object.getOwnPropertyNames(user).forEach( (props) => console.log(props)));
  const userInfo = JSON.parse(user._customData)

  const [DATA, setDATA] = useState([]);

  useEffect( () => {
    async function fetchData() {
      const data = await photosByUser(user.id);
      setDATA(data);
    }
    fetchData();
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

    // Header element for the scrolling Flatlist 
    const _renderHeader = () => <View style={styles.container}>
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
                  title="Sign Out"
                  onPress={() => {
                    signOut();
                    // navigation.navigate('Login');
                  }}
                />
          </Box>
          <Heading alignSelf='flex-start'>My Pics</Heading>
      </View>

    // Footer element for the scrolling Flatlist 
    const _renderFooter = () => <View style={{ paddingVertical: 4}}>
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>

    //List Item Component 
    const Item = ({ url }) => (
      <Box maxWidth="25%" height="100">
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
      </Box>
    );
  
    //Process each item of the data array
    const renderItem = ({ item }) => (
      <Item url={item.url} />
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
        // scrollEnabled={false}
        ListHeaderComponent={() => _renderHeader()}
        ListFooterComponent={() => _renderFooter()}
        numColumns={4}
        key={4}
        data={DATA}
        renderItem={renderItem}
        style={{ paddingHorizontal: 4, width: '100%' }}
        >
        </FlatList>
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