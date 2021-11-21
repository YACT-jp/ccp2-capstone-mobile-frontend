import React from 'react';
import {View, Text, Button, StyleSheet, useColorScheme} from 'react-native';
import {AuthContext} from '../context';
function ProfileScreen({navigation}) {
  const {user, setUser} = React.useContext(AuthContext);
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={{
        backgroundColor: isDarkMode ? '#000' : '#fff',
      }}>
      <Text>Your profile here</Text>
      {/* <Button
        title="Go to Results"
        onPress={() => navigation.navigate('Search')}
      /> */}
      <Button title="Sign Out" onPress={() => setUser(null)} />
    </View>
  );
}

export default ProfileScreen;
