import {
  View,
  Text,
  TextStyle,
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/Colors';
import {fontSizes} from '../../constants';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  textStyle?: TextStyle;
};

const Button = (props: ButtonProps) => {
  const {title, textStyle, style} = props;
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      style={[
        styles.container,
        style,
        {
          opacity: props.disabled ? 0.6 : 1,
          backgroundColor: props.disabled ? '#f5f5f5' : Colors.primary,
        },
      ]}>
      <Text
        style={[
          styles.titleStyle,
          textStyle,
          {color: props.disabled ? 'black' : 'white'},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
  },
  titleStyle: {
    fontSize: fontSizes.h4,
    textAlign: 'center',
    includeFontPadding: false,
  },
});
