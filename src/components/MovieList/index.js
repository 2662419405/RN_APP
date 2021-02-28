import React from 'react';
import {StyleSheet, Text, Dimensions, FlatList, View} from 'react-native';
import {MovieItem} from '../index';

const {width} = Dimensions.get('window');

export default class extends React.PureComponent {
  renderFooter = () => {
    return (
      <View style={styles.loadview}>
        <View style={styles.loadmore}>
          <Text style={styles.loadtext}>ヾ(ｏ･ω･)ﾉ 再怎么找也没有啦</Text>
        </View>
      </View>
    );
  };

  renderItem = ({item, index}) => {
    return <MovieItem item={item} index={index} />;
  };

  render() {
    const {HomeList} = this.props;
    return (
      <FlatList
        style={[styles.content]}
        ListFooterComponent={this.renderFooter}
        data={HomeList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  loadview: {
    padding: 20,
    alignItems: 'center',
  },
  loadtext: {
    color: '#999',
    fontSize: 14,
    paddingHorizontal: 5,
  },
  loadmore: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
