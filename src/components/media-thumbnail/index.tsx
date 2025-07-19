import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import FastImage, {FastImageProps} from 'react-native-fast-image';
const {width} = Dimensions.get('window');
type MediaIconProps = {
  uri: string;
  imageSize?: number;
  boxsize?: number;
  containerStyle?: ViewStyle;
  fastImageProps?: FastImageProps;
};
const Thumbnail = ({
  uri,
  boxsize,
  imageSize,
  containerStyle,
  fastImageProps,
}: MediaIconProps) => {
  return (
    <View
      style={[
        styles.imageContainer,
        boxsize != undefined && {width: boxsize, height: boxsize},
      ]}>
      <ImageBackground blurRadius={5} source={{uri}} style={styles.imageBox}>
        <Image
          source={require('../../assets/icons/audio_disk.png')}
          style={styles.diskImage}
        />
        <FastImage
          source={{uri}}
          style={[
            styles.thumbnail,
            imageSize != undefined && {width: imageSize, height: imageSize},
          ]}
          resizeMode={FastImage.resizeMode.cover}
          {...fastImageProps}
        />
      </ImageBackground>
    </View>
  );
};

export default Thumbnail;

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 5,
    overflow: 'hidden',
    margin: 5,
  },
  imageBox: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  diskImage: {
    width: 95,
    height: 95,
    borderRadius: 50,
  },
  thumbnail: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});
