import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {useNavigation} from '@react-navigation/native';
import Profile from './Profile';
import ProfileForm from './ProfileForm';

const Stack = createNativeStackNavigator();

function ProfileStack() {
//   const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My Profile"
        component={Profile}
      />
      <Stack.Screen
        name="Edit Profile"
        component={ProfileForm}
      />
    </Stack.Navigator>
  );
}

export default ProfileStack;
