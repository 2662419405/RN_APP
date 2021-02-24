import React, {PureComponent} from 'react';
import {BackHandler, ToastAndroid} from 'react-native';
import Index from './src';

class App extends PureComponent {
  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  onBackAndroid = () => {
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      //最近2秒内按过back键，可以退出应用。
      return false;
    }
    this.lastBackPressed = Date.now();
    ToastAndroid &&
      ToastAndroid.show('(；′⌒`)再按就拜拜了', ToastAndroid.SHORT);
    return true;
  };

  render() {
    return (
      <>
        <Index />
      </>
    );
  }
}

export default App;
