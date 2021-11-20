import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {searchContext} from '../components/searchContext';

import HomeScreen from '../screens/HomeScreen';
//import ResultsScreen from "../screens/ResultsScreen";
import SearchStackScreen from '../screens/SearchStackScreen';
import SavedScreen from '../screens/SavedScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const Menu = ({queryString, setQueryString}) => {
  console.log('query', queryString);
  return (
    <searchContext.Provider value={[queryString, setQueryString]}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchStackScreen} />
        <Tab.Screen name="Saved" component={SavedScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </searchContext.Provider>
  );
};

export default Menu;
