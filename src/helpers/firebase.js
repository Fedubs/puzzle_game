import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
// import {orderBy} from 'lodash';
import uuid from 'react-uuid';
import {getToday} from './getDate';

var _ = require('lodash');
const today = getToday();

export const clearAllData = async () => {
  AsyncStorage.getAllKeys()
    .then(keys => AsyncStorage.multiRemove(keys))
    .then(() => alert('success'));
};
export const storeUserInfo = async (value, dispatch) => {
  // store userInfo to Redux
  dispatch({
    type: 'SET_USER_INFO',
    payload: value,
  });
  // store userInfo/userID to AsyncStorage
  try {
    await AsyncStorage.setItem('userInfo', JSON.stringify(value));
  } catch (e) {}
};

export const getUsers = async dispatch => {
  // set userId
  let tempId = uuid();
  let userId;
  try {
    const value = await AsyncStorage.getItem('userId');
    if (value !== null) {
      userId = JSON.parse(value);
      dispatch({type: 'SET_USER_ID', payload: JSON.parse(value)});
    } else {
      try {
        userId = tempId;
        await AsyncStorage.setItem('userId', JSON.stringify(tempId));
        dispatch({type: 'SET_USER_ID', payload: tempId});
      } catch (e) {}
    }
  } catch (e) {}
  // set results
  let result = [];
  firestore()
    .collection('users')
    .orderBy('maxScoreTotal', 'desc')
    .get()
    .then(res => {
      res.forEach(item => {
        result.push(item.data());
      });
      rank = result.findIndex(e => e.id === userId) + 1;
      dispatch({type: 'SET_USER_RANK', payload: rank});
      dispatch({type: 'SET_USERS_INFO', payload: result});
    });
  firestore()
    .collection('users')
    .doc(userId)
    .get()
    .then(res => {
      if (res.exists) {
        console.log('Exist!!!', res.data().maxScoreWeek);
        dispatch({type: 'SET_USER_INFO', payload: res.data()});
      } else {
        console.log('Exist!!! - NO');
        dispatch({
          type: 'SET_USER_INFO',
          payload: {
            id: userId,
            name: '',
            avatarImg: 0,
            maxScoreToday: {[today]: 0},
            maxScoreWeek: [
              {111: 24245},
              {222: 44232},
              {333: 52344},
              {444: 36344},
              {555: 34424},
              {666: 34774},
              {777: 43944},
            ],
            maxScoreTotal: 0,
          },
        });
      }
      dispatch({type: 'SET_IS_UPDATING', payload: false});
    });
};

export const getFsUser = (dispatch, userId) => {
  console.log('getFSUser - userID', userId);
  firestore()
    .collection('users')
    .doc(userId)
    .get()
    .then(documentSnapshot => {
      console.log('getFSUSER exists: ', documentSnapshot.exists);
      if (documentSnapshot.exists) {
        console.log('getFSUSER data: ', documentSnapshot.data());
        dispatch({type: 'SET_USER_INFO', payload: documentSnapshot.data()});
      }
    });
};

export const getUserRank = (users, userId, dispatch) => {
  console.log('getRank', users, userId, dispatch);
  const userRank = users.findIndex(e => e.id == userId) + 1;
  dispatch({type: 'SET_USER_RANK', payload: userRank});
};
