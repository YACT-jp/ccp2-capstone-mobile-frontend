import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import {AuthContext} from '../context';

export const SignUp = () => {
  const {user, setUser} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Create Account Screen</Text>
      <Text>User: {user}</Text>
      <Button title="Create Account" onPress={() => signUp()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});
