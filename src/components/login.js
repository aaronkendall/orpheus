// Authenticate with Firebase

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import * as firebase from 'firebase';
import { app } from '../misc/firebase';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.performLogin = this.performLogin.bind(this);
  }

  performLogin() {
    app.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        if (app.auth().currentUser) {
          this.props.navigator.push({ id: 'Account' })
        }
      }, (error) => {
        console.error(error);
      });
  }

  render() {
    return(
      <View>
        <TextInput
          style={{height: 40}}
          placeholder='Email'
          onChangeText={(text) => this.setState({email: text})}
        />
        <TextInput
          style={{height: 40}}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={(text) => this.setState({password: text})}
        />
        <TouchableHighlight onPress={this.performLogin}>
          <Text>
            Login
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
};

export default Login;
