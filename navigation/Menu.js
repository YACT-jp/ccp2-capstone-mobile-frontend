import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {searchContext} from '../providers/SearchProvider';
import {
  NativeBaseProvider,
  HamburgerIcon,
  SearchIcon,
  CheckIcon,
  InfoOutlineIcon,
} from 'native-base';
import HomeScreen from '../screens/HomeScreen';
//import ResultsScreen from "../screens/ResultsScreen";
import SearchStackScreen from '../screens/SearchStackScreen';
//import SavedScreen from '../screens/SavedScreen';
import SavedStackScreen from '../screens/savedStackScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const Menu = ({queryString, setQueryString}) => {
  console.log('query', queryString);
  return (
    <NativeBaseProvider>
      <searchContext.Provider value={[queryString, setQueryString]}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            headerShown: false,
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Home') {
                return <HamburgerIcon size="5" mt="0.5" />;
              } else if (route.name === 'Search') {
                return <SearchIcon size="5" mt="0.5" />;
              } else if (route.name === 'Saved') {
                return <CheckIcon size="5" mt="0.5" />;
              } else if (route.name === 'Profile') {
                return <InfoOutlineIcon size="5" mt="0.5" />;
              }
            },
            // tabBarActiveTintColor: 'tomato',
            // tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SearchStackScreen} />
          <Tab.Screen name="Saved" component={SavedStackScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </searchContext.Provider>
    </NativeBaseProvider>
  );
};

export default Menu;
