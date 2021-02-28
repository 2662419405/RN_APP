import React, {PureComponent} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Alert,
  // WebView,
} from 'react-native';
import IconComponent from 'react-native-vector-icons/MaterialIcons';
import {WebView} from 'react-native-webview';
import {HomeList, Scrollviewpager} from '../../components';
import {Screen} from '../index';
import {isLT19} from '../../utils/ScreenUtil';

const {width, height} = Dimensions.get('window');

const tablist = [
  {
    type: '1',
    name: '电影',
  },
  {
    type: '2',
    name: '电视剧',
  },
  {
    type: '3',
    name: '综艺',
  },
  {
    type: '4',
    name: '动漫',
  },
];

const tabBarOptions = {
  style: {
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: '#fff',
  },
  labelStyle: {
    color: '#666',
  },
  activeTintColor: '#db4437',
  indicatorStyle: {
    width: 20,
    borderRadius: 4,
    height: 3,
    backgroundColor: '#db4437',
    bottom: 2,
  },
};
export default class extends PureComponent {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        {/* 状态栏 */}
        <StatusBar
          backgroundColor={'rgba(255,255,255, 0)'}
          translucent={true}
        />
        {/* 头部 */}
        <View style={[styles.header]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              Alert.alert('功能尚未开发', '', [{text: '确定'}]);
            }}>
            <Image
              style={[styles.avatarImg]}
              source={require('./../../../assets/images/logo.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={[styles.headerContainer]}>
            <TouchableOpacity
              style={styles.swiperItem}
              activeOpacity={0.8}
              onPress={() => {
                navigation.push('Search');
              }}>
              <Image
                source={require('./../../../assets/images/i_search.png')}
                resizeMode={'contain'}
                style={styles.headerSearchImg}
              />
              <Text style={styles.headerSearchText}>快来搜索热门内容吧</Text>
            </TouchableOpacity>
          </View>
          <IconComponent size={25} name="sms" color="#fff" />
        </View>
        {/* 栏目条 */}
        <Scrollviewpager
          style={styles.HomeContainer}
          tabBarOptions={tabBarOptions}>
          <View style={[styles.viewContent]} tablabel="首页">
            <HomeList />
          </View>
          {tablist.map((item, index) => {
            return (
              <View style={[styles.viewContent]} key={index} tablabel={item.name}>
                <Screen url={item.type} />
              </View>
            );
          })}
        </Scrollviewpager>
        {/* <WebView
          originWhitelist={['*']}
          source={{
            uri:
              'https://play.79da.com/m3u8/?v=nq3WpqVtYmesosme0GeS2q3EkahplMmiaGNnZ5OWnGVpaLujhpmYmqCLlKLPnZXdYs5jq2wO0O0O',
          }}
          style={{width: width, height: height}}></WebView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    position: 'relative',
  },
  viewContent: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  avatarImg: {
    height: 45,
    width: 45,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#d81e06',
    height: 70,
    paddingTop: isLT19() ? 0 : 30,
    paddingBottom: 5,
  },
  headerContainer: {
    width: width * 0.7,
    height: 33,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,.3)',
  },
  swiperItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSearchImg: {
    width: 17,
    height: 17,
    marginRight: 5,
  },
  headerSearchText: {
    color: '#F8F8F8',
  },
});
