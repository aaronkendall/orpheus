// Main account page once authenticated to set song and display results
// Also need to manage authenticating with Spotify here.

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import * as firebase from 'firebase';
import { app } from '../misc/firebase';

class Account extends Component {

  constructor(props) {
    super(props);
    this.state = {
      spotifyAuth: false,
      chosenSong: {}
    }
  }


  render() {
    return(
      <Text>
        You made it to the account page!
      </Text>
    );
  }
};

AppRegistry.registerComponent('Account', () => Account);
export default Account;
