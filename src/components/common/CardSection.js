import React from 'react';
import {View, StyleSheet} from 'react-native';

const CardSection = props => (
  <View style={styles.container}>{props.children}</View>
);

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    position: 'relative',
    flexDirection: 'row',
    borderColor: '#ddd',
    borderRadius: 6,
  },
});

export {CardSection};
