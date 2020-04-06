import React, {Component} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {Header} from './components/common';
import firebase from 'firebase';
import LoginForm from './components/common/LoginForm';

class App extends Component {
  state = {loggedIn: false};

  async componentWillMount() {
    let config = {
      apiKey: 'Aapikey',
      authDomain: 'authdomain',
      databaseURL: 'database',
      projectId: 'id',
      storageBucket: 'storage',
      messagingSenderId: 'message',
      appId: 'appid',
      measurementId: 'mesid',
    };

    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged();
  }

  signOut() {
    this.setState({loggedIn: true});
  }

  renderContent() {
    if (this.state.loggedIn) {
      return (
        <Button title="Sign out" onPress={() => firebase.auth().signOut()} />
      );
    }

    return (
      <LoginForm
        callback={() => {
          this.signOut.bind(this);
        }}
      />
    );
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <Header headerText="Login" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    margin: 15,
  },
});

export default App;
