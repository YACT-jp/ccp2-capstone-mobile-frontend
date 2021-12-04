import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import {Button} from 'native-base';
import {searchContext} from '../providers/SearchProvider';

function HomeScreen({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const [text, setText] = useState('');
  const [queryString, setQueryString] = React.useContext(searchContext);

  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? '#000' : '#fff',
      }}>
      <View
        style={{
          backgroundColor: isDarkMode ? '#000' : '#fff',
        }}>
        <Text style={styles.text}>Home Page</Text>
        <TextInput
          value={text}
          style={{fontSize: 42, color: 'steelblue'}}
          placeholder="Type here..."
          onChangeText={text => {
            setText(text);
            setQueryString(text);
          }}
        />
        <Text style={{fontSize: 24}}>
          {'\n'}You entered: {text}
        </Text>
        <Button
          margin="2"
          colorScheme="blue"
          onPress={() =>
            navigation.navigate('Search', {screen: 'Media Results'})
          }>
          Go to Results
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
  text: {
    color: 'rgb(59,108,212)',
  },
});
