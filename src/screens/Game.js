import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Playground from '../containers/Playground';
import {LeaderboardScreen} from './Leaderboard';
import {SplashScreen} from './Splash';
import {StartScreen} from './Start';

const Stack = createNativeStackNavigator();
const Game = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Playground" component={Playground} />
          <Stack.Screen name="Start" component={StartScreen} />
          <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#404040',
    height: '100%',
  },
  sectionContainer: {
    width: '100%',
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default Game;
