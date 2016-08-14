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
    this._setSong = this._setSong.bind(this);
    this._searchSpotify = this._searchSpotify.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentWillUpdate = this.componentWillUpdate.bind(this);
  }

  componentWillMount() {
    fetch(spotifyConfig.spotifyUserURL, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.props.route.accessToken
      }})
      .then((response) => response.json())
      .then((responseJSON) => {
        if (responseJSON.error) {
          this.props.navigator.push({ id: 'Login', refreshAuth: true });
        }
        this.setState({
          spotifyEmail: responseJSON.email,
          spotifyUsername: responseJSON.id,
          spotifyDisplayName: responseJSON.display_name,
          spotifyProfileURL: responseJSON.href,
          spotifyProduct: responseJSON.product,
          spotifyFollowers: responseJSON.followers,
          spotifyCountry: responseJSON.country
        });
      })
      .catch((error) => {
        console.log("error fetching user data", error);
        this.props.navigator.push({ id: 'Login', refreshAuth: true });
      })
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.query !== this.state.query ) {
      this._searchSpotify();
    };
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
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({ searchResults: responseJSON.tracks.items });
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
    let chosenSong = null;
    if (this.state.chosenSong) {
      chosenSong =
        <Text style={styles.title}>
          Daily Song: {this.state.chosenSong.name}
        </Text>
    }
    return(
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Hello, {this.state.spotifyUsername}
          </Text>
          {content}
          <Results songs={this.state.searchResults} selectSong={this._setSong} />
        </View>
      </View>
    );
  }
};

export default Account;
