import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button} from 'native-base';
import Profile from './Profile';
import ProfileForm from './ProfileForm';
import { useAuth } from '../../providers/AuthProvider';


const Stack = createNativeStackNavigator();

function ProfileStack() {
  const {signOut} = useAuth();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My Profile"
        component={Profile}
        options={{
          headerRight: () => (
            <Button
              colorScheme="blue"
              size="sm"
              variant="outline"
              onPress={() => {
                signOut();
              }}>
              Sign Out
            </Button>
          ),
        }}
      />
      <Stack.Screen name="Edit Profile" component={ProfileForm} />
    </Stack.Navigator>
  );
}

export default ProfileStack;
