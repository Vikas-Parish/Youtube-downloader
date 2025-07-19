import React from 'react';
import Navigator from './src/screens/Navigator';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PaperProvider} from 'react-native-paper';
import store from './src/redux/Store';
import {Provider} from 'react-redux';
const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          <Navigator />
        </SafeAreaView>
      </PaperProvider>
    </Provider>
  );
};

export default App;
