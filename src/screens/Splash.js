import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import logoImg from '../../assets/icons/logo.png';
import {getUsers} from '../helpers/firebase';

const THEME_COLOR = '#14142f';
export const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    // clearAllData();
    getUsers(dispatch);
    setTimeout(() => {
      navigation.replace('Start');
    }, 5000);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={THEME_COLOR} />
      <View>
        <Image source={logoImg} style={styles.logo} />
        <Text style={styles.text1}>PUZZLE</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#262626',
  },
  text1: {
    color: '#fff',
    fontSize: 40,
    lineHeight: 84,
    letterSpacing: 1.8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {width: 150, height: 150},
});
