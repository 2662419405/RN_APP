import React, {PureComponent} from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Ionicons from 'react-native-vector-icons/AntDesign';
import {Home, My, Hot, Interest, Search} from './pages';
import {RouterConstant} from './constant';

let {TabRouterList} = RouterConstant;

const TabNavigatorConfig = {
  defaultNavigationOptions: ({navigation}) => ({
    tabBarIcon: ({focused, horizontal, tintColor}) => {
      let {routeName} = navigation.state;
      let defaultIcon = ''; //默认图标
      if (routeName === '我的') {
        defaultIcon = 'user';
      }
      if (routeName === '首页') {
        defaultIcon = 'home';
      }
      if (routeName === '热门') {
        defaultIcon = 'hearto';
        if (focused) {
          defaultIcon = 'heart';
        }
      }
      if (routeName === '兴趣') {
        defaultIcon = 'frowno';
        if (focused) {
          defaultIcon = 'smileo';
        }
      }
      return <Ionicons name={defaultIcon} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
};

const StackNavigatorConfig = {
  headerMode: 'none',
};

const BottomTab = createBottomTabNavigator(
  {
    首页: Home,
    热门: Hot,
    兴趣: Interest,
    我的: My,
  },
  TabNavigatorConfig,
);

const AppContainer = createAppContainer(
  createStackNavigator(
    {
      BottomTab: BottomTab,
      Search: Search,
    },
    StackNavigatorConfig,
  ),
);

export default AppContainer;
