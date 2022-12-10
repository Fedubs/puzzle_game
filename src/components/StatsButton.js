import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import statsImg from '../../assets/icons/stats.png';
export const StatsButton = () => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => dispatch({type: 'SHOW_STATS_MODAL'})}>
      <Image source={statsImg} style={styles.img} />
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
