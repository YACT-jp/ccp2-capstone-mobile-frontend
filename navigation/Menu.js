import React, {useEffect, useState} from 'react';
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
import ProfileStack from '../screens/profile/ProfileStack';
import {updateAsyncSavedLocations} from '../data/asyncSavedLocations';
import {useAuth} from '../providers/AuthProvider';
import {apiAuth} from '../data/data';
import {retrieveUserSession, storeUserSession} from '../data/secureStorage';

const Tab = createBottomTabNavigator();

const Menu = ({queryString, setQueryString}) => {
  //console.log('query', queryString);
  const {user} = useAuth();
  const userInfo = JSON.parse(user._customData);
  const [appStarted, setAppStarted] = useState(false);

  // load to AsyncStorage saved location on application startup
  useEffect(() => {
    async function fetchToken() {
      try {
        // Check if we already have a token in secure storage
        const localToken = await retrieveUserSession();
        if (localToken && localToken['token']) {
          console.log('getting local token:');
        }
        // Check if local token needs to be refreshed
        if (localToken && localToken['timestamp']) {
          const nowTime = new Date();
          const thenTime = new Date(localToken['timestamp']);
          const maxDiff = 86400000 * 24; //Days in milliseconds * number of days to refresh token
          if (nowTime.getTime() - thenTime.getTime() > maxDiff) {
            console.log('====== NEED TO REFRESH TOKEN ======');
            console.log('fetchingnew token from api');
            const userData = await apiAuth(user.id, userInfo.email);
            const inMemToken = JSON.parse(userData).data.token;
            console.log('GOT NEW REMOTE TOKEN');
            storeUserSession(inMemToken);
          } else {
            console.log("DON'T NEED TO REFRESH TOKEN");
          }
        }

        // No local token so get a new token from auth api
        if (!localToken || !localToken['token']) {
          console.log('fetching token from api');
          const userData = await apiAuth(user.id, userInfo.email);
          const inMemToken = JSON.parse(userData).data.token;
          console.log('GOT REMOTE TOKEN');
          storeUserSession(inMemToken);
        }
        console.log('fetching data');
        await updateAsyncSavedLocations(user.id);
      } catch (error) {
        console.warn(error);
      }
    }
    if (!appStarted) {
      fetchToken();
      setAppStarted(true);
    }
  }),
    [];

  return (
    <NativeBaseProvider>
      <searchContext.Provider value={[queryString, setQueryString]}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            headerShown: false,
            initialRouteName: 'Home',
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
          <Tab.Screen name="Profile" component={ProfileStack} />
        </Tab.Navigator>
      </searchContext.Provider>
    </NativeBaseProvider>
  );
};

export default Menu;
