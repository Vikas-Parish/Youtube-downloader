import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {Colors} from '../../constants/Colors';

type LoaderProps = {
  show?: boolean;
  hide?: () => void;
};

export default ({show, hide}: LoaderProps) => {
  return (
    <Modal
      visible={show}
      transparent={true}
      onDismiss={hide}
      statusBarTranslucent>
      <View style={styles.container}>
        {/* <View
          style={{
            height: 80,
            width: 80,
            backgroundColor: '#ffff',
            borderRadius: 10,
            justifyContent: 'center',
          }}> */}
          <ActivityIndicator size={'large'} color={Colors.primary} />
        {/* </View> */}
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
});
// aaj aaj m iss ki download ki bottom sheet bna duga tu audio or video ko merge kese krte h vo dekhna ok
// or react native file system RNFS name se mile ga vo dekhna add to kr rkha h mene code kese likhna h tarike se vo dekhna ok

