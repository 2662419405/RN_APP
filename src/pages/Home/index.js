import React, {PureComponent} from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import IconComponent from 'react-native-vector-icons/MaterialIcons';

export default class extends PureComponent {
  render() {
    const {navigation} = this.props;
    return (
      <View>
        <View style={[styles.header]}>
          <Image
            style={[styles.avatarImg]}
            source={require('../../img/avatar.jpg')}
          />
          <View style={[styles.headerContainer]}>
            <TextInput
              onFocus={() => {
                navigation.navigate('Search');
              }}
              style={[styles.headerInput]}
              placeholder="搜索热门内容~"
              returnKeyLabel="搜索"
              selectionColor="#000"
            />
          </View>
          <IconComponent
            size={25}
            name="sms"
            color="#999"
            placeholderTextColor="#909090"
          />
        </View>
        <Text>首页</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatarImg: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  header: {
    marginHorizontal: 15,
    marginVertical: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerInput: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#ddd',
    fontSize: 14,
    paddingVertical: 0,
  },
  headerContainer: {
    flex: 1,
    height: 34,
  },
});
