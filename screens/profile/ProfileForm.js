import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/core';
import {
  NativeBaseProvider,
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  Link,
  Text,
} from 'native-base';
import {useAuth} from '../../providers/AuthProvider';
import {updateProfile} from '../../data/data';

function ProfileForm({route, navigation}) {
  const {user} = useAuth();
  // const userInfo = JSON.parse(user._customData);
  const {username, email, bio} = route.params;

  const [usernameField, setUsernameField] = useState(username);
  const [bioField, setBioField] = useState(bio);

  const onUpdatePress = objectInput => {
    const fetchUpdateData = async () => {
      const res = await updateProfile(user.id, objectInput);
      console.log('update res', res);
    };
    fetchUpdateData();
    navigation.navigate('My Profile')
  };

  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          {/* <Heading
            mt="1"
            _dark={{
              color: 'warmGray.200',
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs">
            Sign in to continue!
          </Heading> */}

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Username</FormControl.Label>
              <Input
                onChangeText={setUsernameField}
                value={usernameField}
                autoCapitalize="none"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Bio</FormControl.Label>
              <Input
                onChangeText={setBioField}
                value={bioField}
              />
            </FormControl>
            <Button
              mt="2"
              colorScheme="blue"
              onPress={() => onUpdatePress({
                username: usernameField,
                email: email,
                bio: bioField,
              })}>
              Update
            </Button>
            {/* <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}>
                I'm a new user.{' '}
              </Text>
              <Link
                _text={{
                  color: 'blue.500',
                  fontWeight: 'medium',
                  fontSize: 'sm',
                }}
                onPress={() => navigate('Signup')}>
                Sign Up
              </Link>
            </HStack> */}
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}

export default ProfileForm;
