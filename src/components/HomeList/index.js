import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {Loading, MovieList} from '../index';
// import Ajax from '../../utils/ajax';
import fetch from '../../utils/fetch';

export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      HomeList: [],
      isRender: false,
    };
  }

  async componentDidMount() {
    this._getHomeList();
  }

  _getHomeList = () => {
    fetch({
      url: '/homeList',
      success: (data) => {
        this.setState({
          HomeList: data,
          isRender: true,
        });
      },
    });
  };

  render() {
    const {isRender, HomeList} = this.state;
    if (!isRender) {
      return <Loading />;
    }

    if (HomeList.length === 0) {
      return (
        <View>
          <Text>数据内容为空</Text>
        </View>
      );
    }

    return (
      <View style={[styles.container]}>
        <MovieList HomeList={HomeList} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
