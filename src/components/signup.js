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
import { styles } from '../style/styles';

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
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Sign Up
          </Text>
          <View style={styles.borderBottom}>
            <TextInput
              style={styles.textinput}
              placeholder='Email'
              onChangeText={(text) => this.setState({email: text})}
            />
          </View>
          <View style={styles.borderBottom}>
            <TextInput
              style={styles.textinput}
              placeholder='Password'
              secureTextEntry={true}
              onChangeText={(text) => this.setState({password: text})}
            />
          </View>
          <View style={styles.borderBottom}>
            <TextInput
              style={styles.textinput}
              placeholder='Confirm Password'
              secureTextEntry={true}
              onChangeText={(text) => this.setState({confirmation: text})}
            />
          </View>
          <TouchableHighlight onPress={this.performSignUp} style={styles.button}>
            <Text>
              Sign Up
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.navigateToLogin} style={styles.button}>
            <Text>
              Login
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
};

export default SignUp;
