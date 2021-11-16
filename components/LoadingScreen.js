import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';
import appLogo from '../assets/logo-app.png';

const LoadingScreen = () => {
  useEffect(() => {
    // load initial data (location, anime) to local storage
  }, []);

  const testButton = () => {
    console.log('test');
  };

  return (
    <View style={styles.container}>
      <Image source={appLogo} style={styles.logo} />
      <View style={styles.buttonsContainer}>
        <Button title="Sign In" onPress={testButton} style={styles.buttonsStyle}/>
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Be our Guest" onPress={testButton} style={styles.buttonsStyle}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '80%',
    resizeMode: 'contain',
  },
  buttonsContainer: {
    padding: 10
  },
  buttonsStyle: {
    margin: 10
  },
});

export default LoadingScreen;
