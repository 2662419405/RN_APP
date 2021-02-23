import React, {PureComponent} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppTop} from './components';

export default class extends PureComponent {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <AppTop title="电影天堂" navigation={navigation}>
          <BorderlessButton
            activeOpacity={0.8}
            style={styles.btn}
            onPress={() => navigation.navigate('Search')}>
            <Icon name="search" size={20} color="#000" />
          </BorderlessButton>
        </AppTop>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  btn: {
    width: 48,
    height: 48,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
