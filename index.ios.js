/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 /**
 Learn how the navigator works and use that in here. Login page with link to
 sign up page to begin then movement to account page.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Navigator
} from 'react-native';

import Login from './src/components/login';
import SignUp from './src/components/signup';
import Account from './src/components/account';

class Orpheus extends Component {

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{id: 'SignUp'}}
        renderScene={this.navigatorRenderScene}/>
    );
  }

  navigatorRenderScene(route, navigator) {
    const _navigator = navigator;

    switch (route.id) {
      case 'Login':
        return (<Login navigator={navigator} />);
      case 'SignUp':
        return (<SignUp navigator={navigator} />);
      case 'Account':
        return (<Account navigator={navigator} />);
      default:
        return (<SignUp navigator={navigator} />);
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('orpheus', () => Orpheus);
