import {View, Text} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Downloading from './Downloading';
import Downloaded from './Downloaded';
import {Colors} from '../../../constants/Colors';
import Header from '../../../components/header';
import {useDispatch} from 'react-redux';
import {
  fetchDownloadsVideos,
  MetaDataProps,
} from '../../../database/dao/YouTubeDownloads';
import {retriveDownloadsMedia} from '../../../redux/reducers/Downloads';
import {useFocusEffect} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();
const FileDownloadNavigator = () => {
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      fetchDownloadsVideos()
        .then(data => {
          dispatch(retriveDownloadsMedia(data));
        })
        .catch(e => console.log('Error fetching data:', e));
    }, [dispatch]),
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: 'white'},
        tabBarIndicatorStyle: {backgroundColor: Colors.primary},
      }}>
      <Tab.Screen name="Downloaded" component={Downloaded} />
      <Tab.Screen name="Downloading" component={Downloading} />
    </Tab.Navigator>
  );
};

export default FileDownloadNavigator;
