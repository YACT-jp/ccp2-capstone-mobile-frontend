import React, {useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {
  Image,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
} from 'native-base';
import {useAuth, AuthProvider} from '../providers/AuthProvider';

export const LoginForm = ({navigation: {navigate}}) => {
  const appText = require('../assets/images/emina_text.png');
  const {signIn} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // The onPressSignIn method calls AuthProvider.signIn with the
  // email/password in state.
  const onPressSignIn = async () => {
    console.log('Press sign in');
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert(`Failed to sign in: ${error.message}`);
    }
  };

  return (
    <AuthProvider>
      <NativeBaseProvider>
        <Center flex={1} px="3">
          <Image source={appText} alt="E-Mina" style={styles.logo} />
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading
              mt="1"
              _dark={{
                color: 'warmGray.200',
              }}
              color="coolGray.600"
              fontWeight="medium"
              size="xs">
              Sign in to continue!
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  onChangeText={setEmail}
                  value={email}
                  placeholder="Email"
                  autoCapitalize="none"
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  type="password"
                  onChangeText={text => setPassword(text)}
                  value={password}
                  placeholder="Password"
                  secureTextEntry
                />
                {/* <Link
                  _text={{
                    fontSize: 'xs',
                    fontWeight: '500',
                    color: 'indigo.500',
                  }}
                  alignSelf="flex-end"
                  mt="1">
                  Forgot Password?
                </Link> */}
              </FormControl>
              <Button mt="2" colorScheme="blue" onPress={onPressSignIn}>
                Sign in
              </Button>
              <HStack mt="6" justifyContent="center">
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
              </HStack>
            </VStack>
          </Box>
        </Center>
      </NativeBaseProvider>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: '80%',
    resizeMode: 'contain',
  },
});