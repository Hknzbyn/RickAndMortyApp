import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import {StatusBar, Text} from 'react-native';
import Main from './src/screen/Main';
import {colors} from './src/values/Colors';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.main.light}}>
        <StatusBar hidden={false} barStyle={'dark-content'}  />
        <Main/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
