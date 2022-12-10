const INITIAL_USER_INFO_STATE = {
  usersInfo: null,
  userInfo: null,
  userId: null,
  userRank: 1,
};

export const userInfoReducer = (state = INITIAL_USER_INFO_STATE, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        userInfo: action.payload,
      };
    case 'SET_USERS_INFO':
      return {
        ...state,
        usersInfo: action.payload,
      };
    case 'SET_USER_ID':
      return {
        ...state,
        userId: action.payload,
      };
    case 'SET_USER_RANK':
      return {
        ...state,
        userRank: action.payload,
      };
    case 'CLEAR_USER_INFO':
      return {
        ...state,
        userInfo: null,
      };
    default:
      return state;
  }
};
