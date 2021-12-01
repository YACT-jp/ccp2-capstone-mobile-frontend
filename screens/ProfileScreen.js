import React from 'react';
import {
  View,
  Text,
  Button,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import {
  Flex,
  Heading,
  Image,
  Box,
} from "native-base";
import {useAuth, AuthProvider} from '../providers/AuthProvider';

function ProfileScreen({navigation}) {
  const {user, signUp, signOut} = useAuth();
  //console.log(Object.getOwnPropertyNames(user).forEach( (props) => console.log(props)));
  const userInfo = JSON.parse(user._customData)
  console.log(userInfo.bio)
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? '#000' : '#fff',
      }}>
      <View
        style={{
          backgroundColor: isDarkMode ? '#000' : '#fff',
          alignItems: 'center'
        }}>
          <Box
                safeArea
                w="90%"
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
            <Heading>My Pics</Heading>
            <Flex
              direction="row"
              mb="2.5"
              mt="1.5"
              wrap="wrap"
              _text={{
                color: "coolGray.800",
              }}
            >
              <Box height="100" minWidth="25%" bg="primary.200" flex="1" flexGrow="1">
                <Image
                  source={{
                    uri: "https://wallpaperaccess.com/full/317501.jpg",
                  }}
                  alt="Alternate Text"
                  maxHeight="100%"
                  minWidth="100%"
                  objectFit="cover"
                  align="bottom"
                  height="2000"
                />
              </Box>
              <Box height="100" minWidth="25%" bg="primary.300"  flex="1" flexGrow="1">
                <Image
                  source={{
                    uri: "https://wallpaperaccess.com/full/317503.jpg",
                  }}
                  alt="Alternate Text"
                  maxHeight="100%"
                  minWidth="100%"
                  objectFit="cover"
                  align="bottom"
                  height="2000"
                />
              </Box>
              <Box height="100" minWidth="25%" bg="primary.400" flex="1"  flexGrow="1">
                <Image
                  source={{
                    uri: "https://wallpaperaccess.com/full/317502.jpg",
                  }}
                  alt="Alternate Text"
                  maxHeight="100%"
                  minWidth="100%"
                  objectFit="cover"
                  align="bottom"
                  height="2000"
                />
              </Box>
              <Box height="100" minWidth="25%" bg="primary.400" flex="1"  flexGrow="1">
                <Image
                  source={{
                    uri: "https://wallpaperaccess.com/full/317502.jpg",
                  }}
                  alt="Alternate Text"
                  maxHeight="100%"
                  minWidth="100%"
                  objectFit="cover"
                  align="bottom"
                  height="2000"
                />
              </Box>
              <Box height="100" minWidth="25%" bg="primary.400" flex="1"  flexGrow="1">
                <Image
                  source={{
                    uri: "https://wallpaperaccess.com/full/317502.jpg",
                  }}
                  alt="Alternate Text"
                  maxHeight="100%"
                  minWidth="100%"
                  objectFit="cover"
                  align="bottom"
                  height="2000"
                />
              </Box>
              <Box height="100" minWidth="25%" bg="primary.400" flex="1"  flexGrow="1">
                <Image
                  source={{
                    uri: "https://wallpaperaccess.com/full/317504.jpg",
                  }}
                  alt="Alternate Text"
                  maxHeight="100%"
                  minWidth="100%"
                  objectFit="cover"
                  align="bottom"
                  height="2000"
                />
              </Box>
            </Flex>
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;
