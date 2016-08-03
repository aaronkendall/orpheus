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
import { app } from '../misc/firebase';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmation: ''
    };
    this.performSignUp = this.performSignUp.bind(this);
    this.navigateToLogin = this.navigateToLogin.bind(this);
  }

  performSignUp() {
    if (this.state.password === this.state.confirmation) {
      app.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          if (app.auth().currentUser) {
            this.props.navigator.push({ id: 'Account' });
          }
        }, (error) => {
          console.error(error.message);
        });
    }
    else {
      console.error("Error, confirmation does not match password");
    }
  }

  navigateToLogin() {
    this.props.navigator.push({ id: 'Login' });
  }

  render() {
    return(
      <View style={styles.container}>
        <TextInput
          style={styles.textinput}
          placeholder='Email'
          onChangeText={(text) => this.setState({email: text})}
        />
        <TextInput
          style={styles.textinput}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={(text) => this.setState({password: text})}
        />
        <TextInput
          style={styles.textinput}
          placeholder='Confirm Password'
          secureTextEntry={true}
          onChangeText={(text) => this.setState({confirmation: text})}
        />
        <TouchableHighlight onPress={this.performSignUp} style={{backgroundColor: 'blue'}}>
          <Text>
            Sign Up
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.navigateToLogin} style={{backgroundColor: 'red'}}>
          <Text>
            Login
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222'
  },
  textinput: {
    height: 40,
    borderColor: 'red',
    borderWidth: 1
  }
});

export default SignUp;
