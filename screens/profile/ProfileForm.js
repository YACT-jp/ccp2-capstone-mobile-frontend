import React, {useCallback, useState} from 'react';
import theme from '../../theme';
import {
  NativeBaseProvider,
  Center,
  Box,
  VStack,
  FormControl,
  Input,
  Button,
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
    <NativeBaseProvider theme={theme}>
      <Center flex={1}>
        <Box safeArea p="2" py="8" w="90%" maxW="290">
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
              onPress={() => onUpdatePress({
                username: usernameField,
                email: email,
                bio: bioField,
              })}>
              Update
            </Button>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}

export default ProfileForm;
