import React from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';

const {width} = Dimensions.get('window');

export default class extends React.PureComponent {
  render() {
    const {item, index} = this.props;
    let result = [];
    for (var i = 0; i < item.content.length; i += 3) {
      result.push(item.content.slice(i, i + 3));
    }
    return (
      <View style={[styles.container]}>
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionLeft}>{item.title}</Text>
          {item.nextLinkName && (
            <Text style={styles.sectionRight}>{item.nextLinkName}</Text>
          )}
        </View>
        {result.map((value, suo) => {
          return (
            <View key={suo} style={[styles.movieList]}>
              {value.map((v, i) => {
                return (
                  <TouchableOpacity
                    style={styles.movieI}
                    key={i}
                    style={styles.movieitem}
                    activeOpacity={0.9}>
                    <Image
                      style={styles.movieimg}
                      source={{uri: v.imgsrc || 'http'}}
                    />
                    <View style={styles.movietext}>
                      <Text numberOfLines={1} style={styles.moviename}>
                        {v.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  movieitem: {
    width: (width - 40) / 3,
    marginHorizontal: 5,
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  movieimg: {
    height: (width - 40) / 2,
    flex: 1,
    backgroundColor: '#f1f1f1',
    resizeMode: 'cover',
  },
  moviename: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    flex: 1,
  },
  movietext: {
    alignItems: 'center',
    height: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  sectionTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  sectionRight: {
    color: '#db4437',
  },
  sectionLeft: {
    borderLeftColor: '#db4437',
    borderLeftWidth: 3,
    paddingLeft: 10,
  },
  movieList: {
    flexDirection: 'row',
    width: width,
  },
});
