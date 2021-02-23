import React, {PureComponent} from 'react';
import {
  StatusBar,
  View,
  Text,
  BackHandler,
  Platform,
  ToastAndroid,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Comment, MovieContent, MovieDetail, Search} from './src/pages';
import Index from './src';

const StackNavigatorConfig = {
  headerMode: 'none',
  mode: 'card',
  defaultNavigationOptions: {
    gesturesEnabled: false,
  },
  transitionConfig: () => ({
    screenInterpolator: StackViewStyleInterpolator.forHorizontal,
  }),
};

const DrawerNavigatorConfig = {
  edgeWidth: 50,
  drawerType: 'back',
  drawerWidth : 100,
};

const Drawer = createDrawerNavigator(
  {
    Index: Index,
  },
  DrawerNavigatorConfig,
);

const App = createAppContainer(
  createStackNavigator(
    {
      Drawer: Drawer,
      Search: Search,
      MovieContent: MovieContent,
      MovieDetail: MovieDetail,
      Comment: Comment,
    },
    StackNavigatorConfig,
  ),
);

class Home extends PureComponent {
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
        <StatusBar translucent={true} backgroundColor="transparent" />
        <App />
      </>
    );
  }
}

export default Home;
