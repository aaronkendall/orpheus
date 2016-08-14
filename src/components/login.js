// Authenticate with Firebase

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Linking
} from 'react-native';

import * as firebase from 'firebase';
import { app } from '../misc/firebase';
import { styles } from '../style/styles';
import shittyQs from 'shitty-qs';
import { spotifyConfig } from '../misc/spotify';

class Login extends Component {
  constructor(props) {
    super(props);
    this.performSpotifyAuth = this.performSpotifyAuth.bind(this);
    this.spotifyRedirect = this.spotifyRedirect.bind(this);
    this.performLogin = this.performLogin.bind(this);
  }

  componentWillMount() {
    AsyncStorage.getItem('@Orpheus:spotifyAccessToken')
      .then((token) => {
        if (token !== null && !this.props.navigator.refreshAuth) {
          this.props.navigator.push({ id: 'Account', accessToken: token });
        };
      };
  }

  performSpotifyAuth() {
    Linking.openURL(
      "https://accounts.spotify.com/authorize?" +
      "client_id=" + spotifyConfig.clientId +
      "&response_type=token" +
      "&redirect_uri=" + spotifyConfig.redirectURI +
      "&scope=" + spotifyConfig.scope
    );
    Linking.addEventListener('url', this.spotifyRedirect);
  }

  spotifyRedirect(event) {
    console.log(event.url);
    let queryString = event.url.match(/\#(.*)/);
    let query = shittyQs(queryString);
    AsyncStorage.setItem('@Orpheus:spotifyAccessToken', queryString.access_token)
      .then(() => {
        this.props.navigator.push({ id: 'Account' });
        Linking.removeEventListener('url', this.spotifyRedirect);
      });
  }

  render() {
    return(
      <View>
        <Text style={styles.body}>
          Login or Sign Up to Orpheus with Spotify to search and select your daily
          song and start discovering new music
        </Text>
        <TouchableHighlight onPress={this.performSpotifyAuth} style={styles.button}>
          <Text>
            Login / Sign Up to Spotify
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
};

export default Login;
