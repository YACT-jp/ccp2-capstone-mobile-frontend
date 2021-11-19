import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ResultsScreen from "../screens/ResultsScreen";
import SavedScreen from '../screens/SavedScreen';

//Create a new Stack to use within the search results tab

const SearchStack = createNativeStackNavigator();

function SearchStackScreen() {
  return (
        <SearchStack.Navigator>
          <SearchStack.Screen name="Media Results" component={ResultsScreen} />
          <SearchStack.Screen name="Temp" component={SavedScreen} />
        </SearchStack.Navigator>
  );
}

export default SearchStackScreen;