import React, {useState} from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  NativeBaseProvider,
} from 'native-base';
import {useAuth} from '../providers/AuthProvider';
export const SignupForm = ({navigation: {navigate}}) => {
  const {user, signUp, signIn} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onPressSignUp = async () => {
    try {
      await signUp(email, password);
      navigate('SignIn');
    } catch (error) {
      Alert.alert(`Failed to sign up: ${error.message}`);
    }
  };
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}
            fontWeight="semibold">
            Welcome
          </Heading>
          <Heading
            mt="1"
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}
            fontWeight="medium"
            size="xs">
            Sign up to continue!
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                onChangeText={setEmail}
                value={email}
                placeholder="email"
                autoCapitalize="none"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                onChangeText={text => setPassword(text)}
                value={password}
                placeholder="password"
                secureTextEntry
              />
            </FormControl>
            {/* <FormControl>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input type="password" />
            </FormControl> */}
            <Button mt="2" colorScheme="indigo" onPress={onPressSignUp}>
              Sign Up
            </Button>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};
