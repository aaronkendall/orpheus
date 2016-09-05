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
    super(props);
  }

  render() {
    let songList = null;
    if (this.props.songs) {
      songList = this.props.songs.map((song) => {
        return(
          <TouchableHighlight onPress={() => this.props.selectSong(song)}
            key={song.id}>
            <View style={styles.songResultCard}>
              <Image style={styles.songImage}
                source={{uri: song.album.images[2].url}}
              />
              <Text style={styles.songDetails}>
                {song.name}
                {song.artists[0].name}
                {song.album.name}
              </Text>
            </View>
          </TouchableHighlight>
        );
      });
    }
    return(
      <View>
        {songList}
      </View>
    );
  }
}

export default Results;
