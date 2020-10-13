import React from 'react';
import AudioScreen from '../Container/AudioScreen';
import VideoScreen from '../Container/VideoScreen';
import StreemingScreen from '../Container/StreemingScreen';
import { createStackNavigator } from '@react-navigation/stack';
import VideoPlay from '../Component/VideoPlay';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function screenStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="tabStack"
        component={tabStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="VideoPlay" component={VideoPlay} />
    </Stack.Navigator>
  );
}
function tabStack() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Audio" component={AudioScreen} />
      <Tab.Screen name="Video" component={VideoScreen} />
      <Tab.Screen name="Streeming" component={StreemingScreen} />
    </Tab.Navigator>
  );
}

export default function HomeNavigator(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="screenStack"
        component={screenStack}

      />
    </Stack.Navigator>
  );
}
