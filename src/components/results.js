// Results component for displaying Spotify search results

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight
} from 'react-native';

import { styles } from '../style/styles';

class Results extends Component {
  constructor(props) {

  }

  render() {
    if (this.props.songs) {
      return(
        <View>
          for (let i = 0; i >= this.props.songs.length; i++) {
            return(
              <TouchableHighlight onPress={this.props.selectSong}>
                <View style={styles.songResultCard}>
                  <Image style={styles.songImage} source={require(song.image)} />
                  <Text style={styles.songDetails}>
                    {song.title}
                    {song.artist}
                    {song.album}
                  </Text>
                </View>
              </TouchableHighlight>
            );
          };
        </View>
      );
    }
    return null;
  }
}

export default Results;
