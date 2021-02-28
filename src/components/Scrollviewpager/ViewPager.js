import React, {PureComponent} from 'react';
import {StyleSheet, View, Platform, ScrollView, Dimensions} from 'react-native';
import ViewPagerComponet from '@react-native-community/viewpager';

const {width} = Dimensions.get('window');

class ViewPagerChild extends PureComponent {
  state = {
    loaded: false,
  };
  componentDidMount() {
    if (this.props.lazyload) {
      this.setState({
        loaded: true,
      });
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.lazyload != this.props.lazyload && !this.state.loaded) {
      this.setState({
        loaded: true,
      });
    }
  }
  render() {
    let {loaded} = this.state;
    return loaded ? this.props.child : null;
  }
}

export default class ViewPager extends PureComponent {
  //默认props
  static defaultProps = {
    initialPage: 0,
    onPageSelected: () => {},
  };
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: props.initialPage,
    };
  }

  componentWillUpdate(nextProps, nextState) {}

  componentWillUnmount() {}

  setPage = (pageIndex) => {
    if (Platform.OS === 'ios') {
      this.viewpager.scrollTo({
        x: pageIndex * this.realWidth,
        y: 0,
        animated: true,
      });
    } else {
      this.viewpager.setPage(pageIndex);
    }
    this.setState({pageIndex});
  };

  scrollEnd = (e) => {
    const {onPageSelected} = this.props;
    const nativeEvent = e.nativeEvent;
    let pageIndex = this.state.pageIndex;
    if (Platform.OS === 'ios') {
      let index = nativeEvent.contentOffset.x / this.realWidth;
      if (pageIndex != index) {
        pageIndex = index;
        onPageSelected(pageIndex);
      }
    } else {
      pageIndex = nativeEvent.position;
      onPageSelected(pageIndex);
    }
    this.setState({pageIndex});
  };

  componentDidMount() {
    if (Platform.OS === 'ios') {
      this.realWidth = width;
      const {initialPage} = this.props;
      this.setPage(initialPage);
    }
  }

  render() {
    const {initialPage} = this.props;
    let {pageIndex, isRender} = this.state;
    return (
      <View style={[styles.content]}>
        {Platform.OS === 'ios' ? (
          <ScrollView
            ref={(viewpager) => (this.viewpager = viewpager)}
            style={styles.content}
            bounces={false}
            onMomentumScrollEnd={this.scrollEnd}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            pagingEnabled={true}
            onLayout={isRender ? null : this._onLayout}>
            {isRender ? (
              React.Children.map(this.props.children, (child, index) => (
                <View style={[styles.content, {width: this.realWidth}]}>
                  <ViewPagerChild
                    child={child}
                    lazyload={pageIndex === index}
                  />
                </View>
              ))
            ) : (
              <View />
            )}
          </ScrollView>
        ) : (
          <ViewPagerComponet
            ref={(viewpager) => (this.viewpager = viewpager)}
            style={styles.content}
            initialPage={initialPage}
            onPageSelected={this.scrollEnd}>
            {React.Children.map(this.props.children, (child, index) => (
              <View style={styles.content}>
                <ViewPagerChild child={child} lazyload={pageIndex === index} />
              </View>
            ))}
          </ViewPagerComponet>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
