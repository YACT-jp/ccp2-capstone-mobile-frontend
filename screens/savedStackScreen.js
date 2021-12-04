import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Location from './Location';
import SavedScreen from './SavedScreen';

//Create a new Stack to use within the search results tab

const SavedStack = createNativeStackNavigator();

function SavedStackScreen() {
  return (
    <SavedStack.Navigator>
      <SavedStack.Screen name="Saved Locations" component={SavedScreen} />
      <SavedStack.Screen name="Saved Location" component={Location} />
    </SavedStack.Navigator>
  );
}

export default SavedStackScreen;
