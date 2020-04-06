import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Card, CardSection, Spinner} from '../common';
import {Input} from 'react-native-elements';
import Spacer from './Spacer';
import firebase from 'firebase';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', error: ''};
  }

  onButtonPress() {
    const {email, password} = this.state;

    this.setState({error: '', loading: true});
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.props.callback)
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSucess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginFail() {
    this.setState({
      error: 'Authencation Failed!!!',
      loading: false,
    });
  }

  onLoginSucess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: '',
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner />;
    }

    return <Button onPress={this.onButtonPress.bind(this)}>Log in</Button>;
  }

  render() {
    return (
      <View>
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Card>
          <Spacer />
          <Spacer />
          <Input
            placeholder="Enter your email"
            label="Email"
            onChangeText={email => this.setState({email})}
            value={this.state.email}
            autoCapitalize={false}
            autoCorrect={false}
          />
          <Spacer />
          <Spacer />
          <Input
            label="Password"
            placeholder="Enter your password"
            autoCapitalize={false}
            autoCorrect={false}
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.setState({password})}
          />

          <Spacer />
          <Spacer />

          <Text style={styles.text}>{this.state.error}</Text>
          <CardSection>{this.renderButton()}</CardSection>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
});

export default LoginForm;
