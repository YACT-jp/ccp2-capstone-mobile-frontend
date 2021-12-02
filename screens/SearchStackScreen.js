import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, SearchIcon, IconButton} from 'native-base';
import ResultsScreen from '../screens/ResultsScreen';
import Location from './Location';
import LocResultsScreen from './LocResultsScreen';

//Create a new Stack to use within the search results tab

const SearchStack = createNativeStackNavigator();

function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Media Results"
        component={ResultsScreen}
        options={{
          headerRight: () => (
            <IconButton
              size="5"
              mt="0.5"
              onPress={() => navigation.goBack()}
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
