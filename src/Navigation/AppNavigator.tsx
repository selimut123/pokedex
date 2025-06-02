import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import Home from '../Screens/Home';
import PokeDetail from '../Screens/PokeDetail';

export type RootStackParamList = {
  Home: undefined;
  PokeDetail: {id: number};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PokeDetail"
          component={PokeDetail}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
