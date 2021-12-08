import React, {useState} from 'react';
import {Alert} from 'react-native';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  HStack,
  Text,
  Link,
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
            Let's create your account!
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
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}>
                Already have an account?{' '}
              </Text>
              <Link
                _text={{
                  color: 'blue.500',
                  fontWeight: 'medium',
                  fontSize: 'sm',
                }}
                onPress={() => navigate('SignIn')}>
                Sign In
              </Link>
            </HStack>
          </VStack>
        </Box>
        <Box safeArea p="2" w="90%" py="8">
          <HStack justifyContent="center">
            <Text
              fontSize="xs"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}>
              By continuing, you agree to our{' '}
            </Text>
            <Link
              _text={{
                color: 'blue.500',
                fontWeight: 'medium',
                fontSize: 'xs',
              }}
              href="https://github.com/YACT-jp/ccp2-capstone-termsAndConditions"
              isExternal>
              Terms And Conditions
            </Link>
            <Text
              fontSize="xs"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}>
              ,{' '}
            </Text>
          </HStack>
          <HStack justifyContent="center">
            <Link
              _text={{
                color: 'blue.500',
                fontWeight: 'medium',
                fontSize: 'xs',
              }}
              href="https://github.com/YACT-jp/ccp2-capstone-privacyPolicy"
              isExternal>
              Privacy Policy
            </Link>
            <Text
              fontSize="xs"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}>
              , and{' '}
            </Text>
            <Link
              _text={{
                color: 'blue.500',
                fontWeight: 'medium',
                fontSize: 'xs',
              }}
              href="https://github.com/YACT-jp/ccp2-capstone-EULA"
              isExternal>
              End User License Agreement
            </Link>
          </HStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};
