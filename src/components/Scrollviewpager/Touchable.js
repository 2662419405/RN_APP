/**
 * Touchable
 */

import React from 'react';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  View,
} from 'react-native';

const Touchable = (props) =>
  Platform.OS === 'ios' ? (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      onLayout={props.onLayout}
      activeOpacity={0.8}>
      <View style={props.style}>{props.children}</View>
    </TouchableOpacity>
  ) : (
    <TouchableNativeFeedback
      delayPressIn={50}
      disabled={props.disabled}
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      onLayout={props.onLayout}
      background={TouchableNativeFeedback.SelectableBackground()}>
      <View style={props.style}>{props.children}</View>
    </TouchableNativeFeedback>
  );

export default Touchable;
