import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import backImg from '../../../../assets/icons/black-background.png';

export const Footer = () => {
  return (
    <View style={styles.container}>
      <Image source={backImg} style={styles.img} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    zIndex: 0,
  },
  img: {
    display: 'flex',
  },
});
