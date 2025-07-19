import React, {useEffect} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  KeyboardAvoidingView,
  ViewStyle,
} from 'react-native';

import {Colors} from '../../constants/Colors';
import {Dimens} from '../../constants/Dimens';

type BottomSheetProps = {
  visible: boolean;
  hide?: () => void;
  style?: ViewStyle;
  cancelable?: boolean;
  children?: any;
};

const BottomSheet = ({
  visible,
  hide,
  style,
  cancelable,
  children,
}: BottomSheetProps) => {
  useEffect(() => {
    if (!visible) return;

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => !cancelable,
    );

    return () => backHandler.remove();
  }, [visible]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      statusBarTranslucent
      onRequestClose={hide}>
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            disabled={!cancelable}
            style={{flex: 1}}
            onPress={hide}
          />
          <View style={[styles.modalContent, style]}>{children}</View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.black_05,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    maxHeight: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: Dimens.alignment,
  },
});

export default BottomSheet;
