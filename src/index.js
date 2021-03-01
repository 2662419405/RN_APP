import React, {PureComponent} from 'react';
import {View, StyleSheet, Platform, StatusBar, StatusBar} from 'react-native';
import {WebView} from 'react-native-webview';

const STATUS_HEIGHT =
  Platform.OS === 'ios'
    ? 20
    : Platform.Version > 19
    ? StatusBar.currentHeight
    : 0;

class App extends PureComponent {
  render() {
    return (
      <View style={[styles.container, styles.status]}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <WebView
          originWhitelist={['*']}
          source={{
            uri: 'https://h5.shtodream.cn',
          }}
          style={[styles.container]}></WebView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  status: {
    paddingTop: STATUS_HEIGHT,
  },
});

export default App;
