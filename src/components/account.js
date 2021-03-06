import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  View,
  AsyncStorage
} from 'react-native';

import Button from './button';
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
    this._refreshSpotifyToken = this._refreshSpotifyToken.bind(this);
    this._setInitialState = this._setInitialState.bind(this);
    this._getSong = this._getSong.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    AsyncStorage.getItem('@Orpheus:spotifyAccessToken')
      .then((accessToken) => {
        fetch(spotifyConfig.spotifyUserURL, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + accessToken
          }})
          .then((response) => response.json())
          .then((responseJSON) => {
            this._setInitialState(responseJSON);
          })
          .catch((error) => {
            console.log(error);
            this._refreshSpotifyToken();
          });
      });
  }

  // componentWillUpdate(nextProps, nextState) {
  //   if (nextState.query !== this.state.query && this.state.query) {
  //     this._searchSpotify();
  //   };
  // }

  _setInitialState(response) {
    this.setState({
      spotifyEmail: response.email,
      spotifyUsername: response.id,
      spotifyDisplayName: response.display_name,
      spotifyProfileURL: response.href,
      spotifyProduct: response.product,
      spotifyFollowers: response.followers,
      spotifyCountry: response.country,
    });
    this._getSong(response.id);
  }

  _getSong(username) {
    app.database().ref('users/' + username + '/song').once('value')
      .then((snapshot) => {
        this.setState({
          chosenSong: snapshot.val() || {}
        });
      });
  }

  _refreshSpotifyToken() {
    AsyncStorage.getItem('@Orpheus:spotifyRefreshToken')
      .then((refreshAuth) => {
        fetch(spotifyConfig.spotifyRefreshURL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refreshToken: refreshAuth,
          })
        }).then((response) => responseJSON = response.json())
          .then((responseJSON) => {
          AsyncStorage.setItem('@Orpheus:spotifyAccessToken', responseJSON.access_token)
            .then(() => {
              this.componentWillMount();
            });
        })
        .catch((error) => {
          this.props.navigator.push({ id: 'Login' });
          console.log("error refreshing auth token:", error);
        });
      });
  }

  _setSong(song) {
    this.setState({ chosenSong: song, searchResults: [] });
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
      <View>
        <View style={styles.borderBottom}>
          <TextInput
            style={styles.textinput}
            placeholder='Search and set your song...'
            onChangeText={(text) => this.setState({query: text})}
          />
        </View>
        <Button onPress={this._searchSpotify} text={'Search'} />
      </View>
    );
  }

  render() {
    let content = this._renderSpotifySearch();
    let chosenSong = null;
    if (this.state.chosenSong) {
      chosenSong =
        <Text style={styles.p}>
          Daily Song: {this.state.chosenSong.name}
        </Text>
    }
    return(
      <View style={styles.container}>
        <Text style={styles.title}>
          Orpheus
        </Text>
        <Text style={styles.subtitle}>
          Hello, {this.state.spotifyUsername}
        </Text>
        {chosenSong}
        {content}
        <Results songs={this.state.searchResults} selectSong={this._setSong} />
      </View>
    );
  }
};

export default Account;
