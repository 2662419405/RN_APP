import {Dimensions, Platform, StatusBar, PixelRatio} from 'react-native';

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {},
  };
}

const {width, height} = Dimensions.get('window');

global.__IOS__ = Platform.OS === 'ios';
const STATUS_HEIGHT =
  Platform.OS === 'ios'
    ? 20
    : Platform.Version > 19
    ? StatusBar.currentHeight
    : 0;

global.$ = {
  STATUS_HEIGHT: STATUS_HEIGHT,
  WIDTH: width,
  HEIGHT: height,
  PixelRatio: PixelRatio.get(),
};
