import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Header from '../../../components/header';
import {Icon} from 'react-native-eva-icons';
import {Colors} from '../../../constants/Colors';
import BottomSheet from '../../../components/bottom-sheet';
import {useAppSelector} from '../../../redux/Store';
import DownloadModal from '../../../modals/DownloadModal';

const HomeScreen = ({navigation}: any) => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  // const {progress, status} = useAppSelector(state => state.download.downloaded);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header />

      <TouchableOpacity
        style={styles.searchBtn}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Search')}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name={'download'} fill={Colors.A9A9A9} width={24} height={24} />
          <Text style={{start: 10, color: Colors.A9A9A9}}>
            Search to download
          </Text>
        </View>
        <View style={styles.searchIcon}>
          <Icon name={'search'} fill={'#fff'} width={24} height={24} />
        </View>
      </TouchableOpacity>

      {/* <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Download Status: {status} ({progress}%)
        </Text>
      </View> */}

      <TouchableOpacity
        style={styles.openSheetBtn}
        onPress={() => setBottomSheetVisible(true)}>
        <Text style={{color: '#fff'}}>Open Bottom Sheet</Text>
      </TouchableOpacity>

      <DownloadModal
        visible={isBottomSheetVisible}
        hide={() => setBottomSheetVisible(false)}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchBtn: {
    paddingVertical: 10,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: Colors.A9A9A9,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '60%',
  },
  searchIcon: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 50,
  },
  progressContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  openSheetBtn: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
});
