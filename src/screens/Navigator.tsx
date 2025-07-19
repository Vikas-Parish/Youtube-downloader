import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {Icon} from 'react-native-eva-icons';
import HomeScreen from './main/home/HomeScreen';
import Search from './main/search';
import {Colors} from '../constants/Colors';
import PlayScreen from './main/my-files/Downloaded';
import {fontSizes} from '../constants';
import YtVideos from './main/videos';
import VideoPlayer from './main/video-player/VideoPlayer';
import FileDownloadNavigator from './main/my-files';
import SplashScreen from 'react-native-splash-screen';
import AllFormat from './main/all-format/AllFormat';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="YtVideos" component={YtVideos} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
      <Stack.Screen name="AllFormat" component={AllFormat} />
      {/* <Stack.Screen
        name="FileDownloadNavigator"
        component={FileDownloadNavigator}
      /> */}
    </Stack.Navigator>
  );
};

const MainApp = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          alignContent: 'center',
          height: 60,
        },
        tabBarLabelStyle: {
          ...styles.tabFont,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#A9A9A9',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigation}
        options={{
          tabBarLabel: ({focused, color}) => (
            <Text style={[styles.tabFont, {color}]}>Home</Text>
          ),
          tabBarIcon: ({color, focused}) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              fill={color}
              width={24}
              height={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyFilesTab"
        component={FileDownloadNavigator}
        options={{
          tabBarLabel: ({focused, color}) => (
            <Text style={[styles.tabFont, {color}]}>My Files</Text>
          ),
          tabBarIcon: ({color, focused}) => (
            <Icon
              name={focused ? 'download' : 'download-outline'}
              fill={color}
              width={24}
              height={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Navigator = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <MainApp />
    </NavigationContainer>
  );
};
export default Navigator;

const styles = StyleSheet.create({
  tabFont: {
    textAlign: 'center',
    fontSize: fontSizes.h6,
    marginBottom: 10,
    includeFontPadding: false,
  },
});
