import React from 'react';
import {
  StyleSheet,
  Text,
  NativeModules,
  Dimensions,
  LayoutAnimation,
  ScrollView,
  View,
} from 'react-native';

import Touchable from './Touchable';
import ViewPager from './ViewPager';

const {UIManager} = NativeModules;

const {width} = Dimensions.get('window');

export default class extends React.PureComponent {
  static defaultProps = {
    pageIndex: 0,
  };
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: props.pageIndex,
      initialWidth: 0,
      swipeEnabled: false,
    };
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  //记录tab的宽度
  tabswidth = [];
  //记录tab的位置
  tabsdir = [];
  //记录滚动位置
  xoffset = 0;
  //实际滚动条宽度
  scrollWidth = 0;

  onPageSelected = (pageIndex) => {
    this.xScroll(pageIndex);
    LayoutAnimation.configureNext({
      duration: 200,
      update: {
        type: 'easeInEaseOut',
      },
    });
    this.props.onPageSelected && this.props.onPageSelected(pageIndex);
  };
  xScroll = (pageIndex) => {
    if (this.scrollWidth == 0) {
      // wait for initing
      return;
    }
    if (this.props.whenPageSelect) {
      this.props.whenPageSelect(pageIndex);
    }
    this.setState({pageIndex});
    if (
      this.tabsdir[pageIndex] + this.tabswidth[pageIndex] - this.scrollWidth >
      this.xoffset
    ) {
      this.xoffset =
        this.tabsdir[pageIndex] +
        this.tabswidth[pageIndex] -
        this.scrollWidth +
        30;
      let last = this.tabsdir.length - 1;
      let max = this.tabsdir[last] + this.tabswidth[last] - this.scrollWidth;
      this.xoffset = this.xoffset >= max ? max : this.xoffset;
      this.tabbar.scrollTo({x: this.xoffset, y: 0, animated: true});
    } else if (this.xoffset > this.tabsdir[pageIndex]) {
      this.xoffset = this.tabsdir[pageIndex] - 30;
      this.xoffset = this.xoffset >= 0 ? this.xoffset : 0;
      this.tabbar.scrollTo({x: this.xoffset, y: 0, animated: true});
    }
  };

  onSetPage = (pageIndex) => {
    this.xScroll(pageIndex);
    this.viewpager.setPage(pageIndex);
    LayoutAnimation.spring();
  };

  onlayout = (e, i) => {
    let {width, x} = e.nativeEvent.layout;
    this.tabswidth[i] = width;
    this.tabsdir[i] = x;
    if (i === this.state.pageIndex) {
      this.setState({initialWidth: width});
      LayoutAnimation.configureNext({
        duration: 200,
        update: {
          type: 'easeInEaseOut',
        },
      });
    }
    if (this.props.pageIndex != 0) {
      this.xScroll(this.props.pageIndex);
    }
  };

  scrollayout = (e) => {
    const width = e.nativeEvent.layout.width;
    this.scrollWidth = width;
    if (this.props.pageIndex != 0) {
      this.xScroll(this.props.pageIndex);
    }
  };

  onContentSizeChange = (contentWidth) => {
    if (contentWidth > width) {
      this.setState({
        swipeEnabled: true,
      });
    }
  };

  scrollEnd = (e) => {
    this.xoffset = e.nativeEvent.contentOffset.x;
  };

  render() {
    const {pageIndex, initialWidth, swipeEnabled} = this.state;
    const {
      tabBarOptions: {
        wrapstyle,
        tabconStyle,
        style,
        labelStyle,
        tabStyle,
        indicatorStyle,
        activeTintColor,
      },
    } = this.props;
    const tablabel = React.Children.map(
      this.props.children,
      (child) => child.props.tablabel,
    );
    return (
      <View style={[styles.container, wrapstyle]}>
        <View style={[styles.scrolltabbar, style]}>
          <ScrollView
            onLayout={this.scrollayout}
            bounces={false}
            onContentSizeChange={this.onContentSizeChange}
            ref={(tabbar) => (this.tabbar = tabbar)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              swipeEnabled && {justifyContent: 'flex-start'},
            ]}
            scrollEnabled={swipeEnabled}
            onMomentumScrollEnd={this.scrollEnd}
            horizontal={true}>
            {tablabel.map((item, i) => (
              <Touchable
                onLayout={(e) => this.onlayout(e, i)}
                key={i}
                onPress={() => {
                  this.onSetPage(i);
                }}
                style={[styles.tabbaritem]}>
                <Text
                  numberOfLines={2}
                  style={[
                    styles.tabbartext,
                    pageIndex === i && {color: '#db4437'},
                  ]}>
                  {item}
                </Text>
              </Touchable>
            ))}
            <View
              style={[
                styles.tabline,
                {
                  width: this.tabswidth[pageIndex] || initialWidth,
                  left: this.tabsdir[pageIndex],
                },
              ]}>
              <View style={[styles.indicatorStyle, indicatorStyle]} />
            </View>
          </ScrollView>
        </View>
        <ViewPager
          ref={(viewpager) => (this.viewpager = viewpager)}
          onPageSelected={this.onPageSelected}
          initialPage={pageIndex}>
          {this.props.children}
        </ViewPager>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrolltabbar: {
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  tabbaritem: {
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabline: {
    height: '100%',
    width: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  tabbartext: {
    fontSize: 14,
    opacity: 1,
    textAlign: 'center',
    color: '#000',
  },
  indicatorStyle: {
    width: '100%',
    height: 2,
    backgroundColor: '#fff',
  },
});
