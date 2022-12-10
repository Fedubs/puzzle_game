import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import menuImg from '../../assets/icons/menu.png';

export const MainButton = () => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => dispatch({type: 'SHOW_MAIN_MODAL'})}>
      <Image source={menuImg} style={styles.img} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  linearGradient: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
