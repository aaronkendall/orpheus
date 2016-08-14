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
import { spotifyConfig } from '../misc/spotify';
import Results from './results';

class Account extends Component {

  constructor(props) {
    super(props);
    this.state = {
      spotifyEmail: '',
      spotifyUsername: '',
      spotifyDisplayName: '',
      spotifyProfileURL: '',
      spotifyProduct: '',
      spotifyFollowers: '',
      spotifyCountry: '',
      query: '',
      searchResults: [],
      chosenSong: {}
    };
    this._renderSpotifySearch = this._renderSpotifySearch.bind(this);
    this._renderSpotifyAuth = this._renderSpotifyAuth.bind(this);
    this._setSong = this._setSong.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
  }

  componentWillMount() {
    fetch(spotifyConfig.spotifyUserURL, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.props.navigator.accessToken,
      }).then((response) => {
        this.setState({
          spotifyEmail: response.email,
          spotifyUsername: response.id,
          spotifyDisplayName: response.display_name,
          spotifyProfileURL: response.external_urls.spotify,
          spotifyProduct: response.product,
          spotifyFollowers: response.followers.total,
          spotifyCountry: response.country
        });
      });
      .catch((error) => {
        console.log("error fetching user data", error);
        this.props.navigator.push({ id: 'Login', refreshAuth: true });
      })
  }

  componentWillUpdate() {
    // Something about state.query changing calls searchSpotify
  }

  _setSong(song) {
    this.setState({ chosenSong: song });
    app.database().ref('users/' + this.state.spotifyUsername).set({
      song: song
    });
  }

  _searchSpotify() {
    fetch(spotifyConfig.spotifySearchURL
      + this.state.query
      + '&market=' + this.state.spotifyCountry)
      .then((response) => {
        this.setState({ searchResults: response.tracksOrSomething });
      });
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

  render() {
    let content = this._renderSpotifySearch();

    return(
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Hello, {this.state.spotifyDisplayName}
          </Text>
          {content}
          <Results songs={this.state.searchResults} selectSong={this._setSong} />
        </View>
      </View>
    );
  }
};

export default Account;
