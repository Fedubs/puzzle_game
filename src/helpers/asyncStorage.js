import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-uuid';

export const getAsyncUserId = async dispatch => {
  let tempId = uuid();
  try {
    const value = await AsyncStorage.getItem('userId');
    if (value !== null) {
      console.log('Async User ID is not Null', JSON.parse(value));
      dispatch({
        type: 'SET_USER_ID',
        payload: JSON.parse(value),
      });
    } else {
      console.log('Async User ID is Null', JSON.parse(value));
      dispatch({
        type: 'SET_USER_ID',
        payload: tempId,
      });
      try {
        await AsyncStorage.setItem('userId', JSON.stringify(tempId));
      } catch (e) {}
    }
  } catch (e) {}
};

export const getAsyncHighScore = async dispatch => {
  try {
    const value = await AsyncStorage.getItem('highScore');
    if (value !== null) {
      console.log('Async High Score is', value);
      dispatch({
        type: 'SET_TOTAL_HIGH_SCORE',
        payload: value,
      });
    } else {
      console.log('Async High Score is Null');
    }
  } catch (e) {}
};

export const getAsyncHighLevel = async dispatch => {
  try {
    const value = await AsyncStorage.getItem('highLevel');
    if (value !== null) {
      console.log('Async High Level is', value);
      dispatch({
        type: 'SET_HIGH_LEVEL',
        payload: value,
      });
    } else {
      console.log('Async High Level is Null');
    }
  } catch (e) {}
};
