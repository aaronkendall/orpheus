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
    }
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

  render() {
    return(
      <View style={styles.container}>
        <TextInput
          style={{height: 40}}
          placeholder='Email'
          onChangeText={(text) => this.setState({email})}
        />
        <TextInput
          style={styles.textinput}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={(text) => this.setState({password})}
        />
        <TextInput
          style={styles.textinput}
          placeholder='Confirm Password'
          secureTextEntry={true}
          onChangeText={(text) => this.setState({confirmation})}
        />
        <TouchableHighlight onPress={this.performSignUp}>
          <Text>
            Sign Up
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textinput: {
    height: 40,
    borderColor: 'red',
    borderWidth: 1
  }
});

AppRegistry.registerComponent('SignUp', () => SignUp);
export default SignUp;
