import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './redux/reducers';
import Game from './screens/Game';
const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <StatusBar hidden />
        <Game />
      </SafeAreaView>
      <Toast />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#404040',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  sectionContainer: {
    width: '100%',
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
