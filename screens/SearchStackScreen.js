import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {Button, SearchIcon, IconButton} from 'native-base';
import ResultsScreen from '../screens/ResultsScreen';
import Location from './Location';
import LocResultsScreen from './LocResultsScreen';

//Create a new Stack to use within the search results tab

const SearchStack = createNativeStackNavigator();

function SearchStackScreen() {
  const navigation = useNavigation();
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Media Results"
        component={ResultsScreen}
        options={{
          headerRight: () => (
            <IconButton
              icon={<SearchIcon />}
              _icon={{
                color: '#2096f3',
                size: 'md',
              }}
              onPress={() => navigation.navigate('Home')}
              title="Info"
              color="#fff"
            />
          ),
        }}
      />
      <SearchStack.Screen name="Locations" component={LocResultsScreen} />
      <SearchStack.Screen name="Location" component={Location} />
    </SearchStack.Navigator>
  );
}

export default SearchStackScreen;
