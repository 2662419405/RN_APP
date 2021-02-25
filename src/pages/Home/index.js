import React, {PureComponent} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import IconComponent from 'react-native-vector-icons/MaterialIcons';
import {HomeList} from '../../components';
import {isLT19} from '../../utils/ScreenUtil';

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
        <View>
          <HomeList />
        </View>
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
    width: $.WIDTH * 0.7,
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
