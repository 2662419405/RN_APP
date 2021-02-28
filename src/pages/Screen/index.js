import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {Loading, MovieList} from '../../components';
import Ajax from '../../utils/ajax';

export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      HomeList: [],
      isRender: false,
    };
  }

  async componentDidMount() {
    // this._getHomeList(this.props.url);
  }

  _getHomeList = (type) => {
    Ajax({
      url: `/innerList?url=/type/${type}.html`,
      success: (res) => {
        this.setState({
          HomeList: res,
          isRender: true,
        });
      },
      error: (err) => {
        console.log(err);
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
