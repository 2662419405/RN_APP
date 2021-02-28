import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import cheerio from 'cheerio';
import {getHomeList} from '../../utils/apiRequest';
import Loading from '../Loading';
import Axios from 'axios';

const {width, height} = Dimensions.get('window');
export default class extends PureComponent {
  async componentDidMount() {
    console.log(1);
    Axios.get('http://app.shtodream.cn/innerList').then((res) => {
      console.log(res);
    });
  }

  render() {
    if (true) {
      return (
          <Loading />
      );
    }

    return <Text></Text>;
  }
}

const styles = StyleSheet.create({
});
