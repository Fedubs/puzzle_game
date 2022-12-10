import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import { ConfirmModal } from '../Modal/confirmModal';
import {MenuModal} from '../Modal/menuModal';
import {StatsModal} from '../Modal/statsModal';
import {Board} from './Board';
import {Footer} from './Footer';
import {HeaderSection} from './Header';
const screenHeight = Dimensions.get('window').height;
const Playground = () => {
  return (
    <View style={styles.container}>
      <HeaderSection />
      <Board />
      <Footer />
      <MenuModal />
      <StatsModal />
      <ConfirmModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#262626',
    paddingHorizontal: 20,
    height: screenHeight,
  },
});

export default Playground;
