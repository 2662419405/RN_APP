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

global.$ = {
  WIDTH: width,
  HEIGHT: height,
  PixelRatio: PixelRatio.get(),
};
