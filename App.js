import React, {PureComponent} from 'react';
import {BackHandler, ToastAndroid, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import './src/utils/globa';
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

  async componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }

  onBackAndroid = () => {
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      //最近2秒内按过back键，可以退出应用。
      return false;
    }
    this.lastBackPressed = Date.now();
    ToastAndroid && ToastAndroid.show('再按一次就退出！', ToastAndroid.SHORT);
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
