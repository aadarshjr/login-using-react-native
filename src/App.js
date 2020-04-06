import React, {Component} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {Header} from './components/common';
import firebase from 'firebase';
import LoginForm from './components/common/LoginForm';

class App extends Component {
  state = {loggedIn: false};

  async componentWillMount() {
    let config = {
      apiKey: 'AIzaSyAgz74XsFU_S37saWVI3eexO1250m-DlwA',
      authDomain: 'auth-78a24.firebaseapp.com',
      databaseURL: 'https://auth-78a24.firebaseio.com',
      projectId: 'auth-78a24',
      storageBucket: 'auth-78a24.appspot.com',
      messagingSenderId: '126823529853',
      appId: '1:126823529853:web:169e50b3908eaa3ec02014',
      measurementId: 'G-PS54VFZZYR',
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
