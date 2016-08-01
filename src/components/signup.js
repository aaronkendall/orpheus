// Sign up page to hook into firebase

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  Image,
  View
} from 'react-native';

import * as firebase from 'firebase';
import app from '../misc/firebase';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmation: ''
    }
  }

  performSignUp() {
    if (this.state.password === this.state.confirmation) {
      app.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          if (app.auth().currentUser) {
            this.props.navigator.push({ id: 'Account' });
          }
        }, () => {
          console.error(error.message);
        });
    }
    else {
      console.error("Error, confirmation does not match password");
    }
  }

  render() {
    return(
      <View>
        <TextInput
          style={{height: 40}}
          placeholder='Email'
          onChangeText={(text) => this.setState({email})}
        />
        <TextInput
          style={{height: 40}}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={(text) => this.setState({password})}
        />
        <TextInput
          style={{height: 40}}
          placeholder='Confirm Password'
          secureTextEntry={true}
          onChangeText={(text) => this.setState({confirmation})}
        />
        <TouchableHighlight onPress={this.performSignUp()}>
          <Text>
            Sign Up
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}
