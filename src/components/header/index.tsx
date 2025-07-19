import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Colors} from '../../constants/Colors';
import {Dimens} from '../../constants/Dimens';
import {Icon} from 'react-native-eva-icons';
import {fontSizes} from '../../constants';

type HeaderProps = {
  title?: string;
  icon?: string;
  size?: number;
  leftComponent?: any;
};
const Header = (props: HeaderProps) => {
  const {title, icon, size, leftComponent} = props;

  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {navigation.canGoBack() && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon
            name={icon || 'arrow-back'}
            width={size || 24}
            height={size || 24}
            fill="#000"
          />
        </TouchableOpacity>
      )}

      {leftComponent ? (
        leftComponent
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    padding: Dimens.alignment,
  },
  title: {
    color: 'black',
    fontSize: fontSizes.h3,
    flex: 1,
    fontWeight: '600',
  },
  backButton: {
    alignSelf: 'center',
    marginEnd: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: Colors.A9A9A9,
    paddingHorizontal: Dimens.alignment,
    backgroundColor: 'white',
  },
});
