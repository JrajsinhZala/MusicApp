import React from 'react';
import {Image} from 'react-native';
import AudioScreen from '../Container/AudioScreen';
import VideoScreen from '../Container/VideoScreen';
import StreemingScreen from '../Container/StreemingScreen';
import {createStackNavigator} from '@react-navigation/stack';
import VideoPlay from '../Component/VideoPlay';
import SplashScreen from '../Container/SplashScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import icons from '../resources/icons';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function screenStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="tabStack"
        component={tabStack}
        options={{headerShown: false}}
      />
      <Stack.Screen name="VideoPlay" component={VideoPlay} />
    </Stack.Navigator>
  );
}
function tabStack() {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBarPosition="bottom"
      tabBarOptions={{
        showIcon: true,
        tabStyle: {backgroundColor: '#0EB9E1'},
        labelStyle: {
          color: '#FFFFFF',
          textTransform: 'none',
          fontWeight: 'bold',
        },
      }}>
      <Tab.Screen
        name="Audio"
        component={AudioScreen}
        options={{
          tabBarLabel: 'Audio',
          tabBarIcon: ({color}) => (
            <Image
              source={icons.audio}
              style={{width: 25, height: 25, tintColor: '#FFFFFF'}}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Video"
        component={VideoScreen}
        options={{
          tabBarLabel: 'Video',
          tabBarIcon: ({color}) => (
            <Image
              source={icons.video}
              style={{width: 25, height: 25, tintColor: '#FFFFFF'}}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Steaming"
        component={StreemingScreen}
        options={{
          tabBarLabel: 'Steaming',
          tabBarIcon: ({color}) => (
            <Image
              source={icons.live}
              style={{width: 25, height: 25, tintColor: '#FFFFFF'}}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function HomeNavigator(props) {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="screenStack" component={screenStack} />
    </Stack.Navigator>
  );
}
