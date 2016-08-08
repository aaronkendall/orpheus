// Main account page once authenticated to set song and display results
// Also need to manage authenticating with Spotify here.

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  View,
  TouchableHighlight
} from 'react-native';

import * as firebase from 'firebase';
import { app } from '../misc/firebase';
import { styles } from '../style/styles';

class Account extends Component {

  constructor(props) {
    super(props);
    this.state = {
      spotifyAuth: false,
      query: '',
      chosenSong: {},
      currentUser: app.auth().currentUser
    };
    this._renderSpotifySearch = this._renderSpotifySearch.bind(this);
    this._renderSpotifyAuth = this._renderSpotifyAuth.bind(this);
    this.performSpotifyAuth = this.performSpotifyAuth.bind(this);
  }

  performSpotifyAuth() {
    this.setState({ spotifyAuth: true });
  }

  _renderSpotifySearch() {
    return(
      <View style={styles.borderBottom}>
        <TextInput
          style={styles.textinput}
          placeholder='Search and set your song...'
          onChangeText={(text) => this.setState({query: text})}
        />
      </View>
    );
  }

  _renderSpotifyAuth() {
    return(
      <View>
        <Text style={styles.body}>
          Link your Orpheus Account with Spotify to search and select your daily
          song and start discovering new music
        </Text>
        <TouchableHighlight onPress={this.performSpotifyAuth} style={styles.button}>
          <Text>
            Login to Spotify
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    let content;
    this.state.spotifyAuth ? content = this._renderSpotifySearch() : content = this._renderSpotifyAuth();

    return(
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Hello, {this.state.currentUser.email}
          </Text>
          {content}
        </View>
      </View>
    );
  }
};

export default Account;
