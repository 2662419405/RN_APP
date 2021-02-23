import React, {PureComponent} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class extends PureComponent {
  onhandle = () => {
    const {navigation, onPress, isBack} = this.props;
    if (isBack) {
      navigation.goBack();
    } else {
      navigation.openDrawer();
    }
    onPress && onPress();
  };

  render() {
    const {title, children, isBack = false} = this.props;
    return (
      <View style={styles.appbar}>
        <BorderlessButton
          activeOpacity={0.8}
          style={styles.btn}
          onPress={this.onhandle}>
          <Icon
            name={isBack ? 'chevron-left' : 'menu'}
            size={isBack ? 24 : 20}
            color="#fff"
          />
        </BorderlessButton>
        <Text style={styles.apptitle}>{title}</Text>
        {children || null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appbar: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  apptitle: {
    flex: 1,
    fontSize: 16,
    // color: '#fff',
  },
});
