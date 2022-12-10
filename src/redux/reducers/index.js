import {combineReducers} from 'redux';
import {modalInfoReducer} from './modalInfo';
import {playInfoReducer} from './playInfo';
import {scoreInfoReducer} from './scoreInfo';
import {userInfoReducer} from './userInfo';

export default combineReducers({
  userInfoReducer,
  scoreInfoReducer,
  modalInfoReducer,
  playInfoReducer,
});
