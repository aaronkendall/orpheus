import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Navigator,
  Linking
} from 'react-native';

import Login from './src/components/login';
import Account from './src/components/account';

class Orpheus extends Component {

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{id: 'Login'}}
        renderScene={this.navigatorRenderScene}
      />
    );
  }

  navigatorRenderScene(route, navigator) {
    const _navigator = navigator;

    switch (route.id) {
      case 'Login':
        return (<Login navigator={navigator} route={route} />);
      case 'Account':
        return (<Account navigator={navigator} route={route} />);
      default:
        return (<Login navigator={navigator} route={route} />);
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
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
