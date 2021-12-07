import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import appLogo from '../assets/emina_logo.png';

const LoadingScreen = () => {
  useEffect(() => {
  }, []);

  return (
    <View style={styles.container}>
      <Image source={appLogo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  logo: {
    width: '80%',
    resizeMode: 'contain',
  },
});

export default LoadingScreen;
