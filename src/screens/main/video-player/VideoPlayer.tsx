import {View, Text} from 'react-native';
import React from 'react';
import Header from '../../../components/header';
import YoutubePlayer from 'react-native-youtube-iframe';
import Loader from '../../../components/loader';

const VideoPlayer = ({route}: any) => {
  const {id} = route.params;
  if (!id.videoId) return <Loader show />;

  return (
    <View style={{flex: 1}}>
      <YoutubePlayer height={500} videoId={id.videoId} play={true} />
    </View>
  );
};

export default VideoPlayer;
