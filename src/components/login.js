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
import { styles } from '../style/styles';

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
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Login
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
          <TouchableHighlight onPress={this.performLogin} style={styles.button}>
            <Text>
              Login
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
};

export default Login;
