import React, {PureComponent} from 'react';
import {Text} from 'react-native';
import {getHomeList} from '../../utils/apiRequest';

export default class extends PureComponent {
  async componentDidMount() {
    console.log('component')
    this.getHomeList();
  }

  render() {
    return <Text>123</Text>;
  }
}
