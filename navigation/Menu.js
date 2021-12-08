import React, {useEffect} from 'react';
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
import SearchStackScreen from '../screens/SearchStackScreen';
import SavedStackScreen from '../screens/savedStackScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {updateAsyncSavedLocations} from '../data/asyncSavedLocations';
import {useAuth} from '../providers/AuthProvider';
import { apiAuth } from '../data/data';
import { storeUserSession } from '../data/secureStorage';

const Tab = createBottomTabNavigator();

const Menu = ({queryString, setQueryString}) => {
  console.log('query', queryString);
  const {user} = useAuth();
  const userInfo = JSON.parse(user._customData);

  // load to AsyncStorage saved location on application startup
  useEffect(() => {
    async function fetchToken() {
      console.log('fetching token');
      try {
        const userData = await apiAuth(user.id, userInfo.email);
        const inMemToken = JSON.parse(userData).data.token;
        console.log('GOT TOKEN:', inMemToken);
        storeUserSession(inMemToken);
      } catch (error) {
        throw error;
      }
    }
    fetchToken();

    async function fetchData() {
      console.log('fetching data');
      try {
        await updateAsyncSavedLocations(user.id);
      } catch (error) {
        throw error;
      }
    }
    fetchData();
  }), [];

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
