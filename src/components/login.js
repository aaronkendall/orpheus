import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Linking,
  AsyncStorage
} from 'react-native';

import * as firebase from 'firebase';
import { app } from '../misc/firebase';
import { styles } from '../style/styles';
import qs from 'shitty-qs';
import { spotifyConfig } from '../misc/spotify';

class Login extends Component {
  constructor(props) {
    super(props);
    this.performSpotifyAuth = this.performSpotifyAuth.bind(this);
    this.spotifyRedirect = this.spotifyRedirect.bind(this);
  }

  componentWillMount() {
    AsyncStorage.getItem('@Orpheus:spotifyAccessToken')
      .then((token) => {
        if (token !== null) {
          this.props.navigator.push({ id: 'Account' });
        }
      });
  }

  performSpotifyAuth() {
    Linking.openURL(
      "https://accounts.spotify.com/authorize?" +
      "client_id=" + spotifyConfig.clientId +
      "&response_type=code" +
      "&redirect_uri=" + spotifyConfig.redirectURI +
      "&scope=" + spotifyConfig.scope
    );
    Linking.addEventListener('url', this.spotifyRedirect);
  }

  spotifyRedirect(event) {
    let queryString = event.url.match(/\?(.*)/)[1];
    let query = qs(queryString);
    let accessToken = query.code;
    fetch(spotifyConfig.spotifyAccessURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: accessToken,
      })
    })
    .then((response) => responseJSON = response.json())
    .then((responseJSON) => {
      AsyncStorage.multiSet([['@Orpheus:spotifyAccessToken', responseJSON.access_token],
                            ['@Orpheus:spotifyRefreshToken', responseJSON.refresh_token]])
        .then(() => {
          this.props.navigator.push({ id: 'Account' });
          Linking.removeEventListener('url', this.spotifyRedirect);
        });
    })
  }

  render() {
    return(
      <View style={styles.background}>
        <View style={styles.container}>
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
      </View>
    );
  }
};

export default Login;
