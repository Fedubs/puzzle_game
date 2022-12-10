const INITIAL_SCORE_INFO_STATE = {
  highScoreTotal: 0,
  highScoreDay: 0,
  currentScore: 0,
  currentLevel: 1,
  highLevel: 1,
  addedScore: 0,
  isUpdating: false,
};

export const scoreInfoReducer = (state = INITIAL_SCORE_INFO_STATE, action) => {
  switch (action.type) {
    case 'SET_IS_UPDATING':
      return {
        ...state,
        isUpdating: action.payload,
      };
    case 'SET_TOTAL_HIGH_SCORE':
      return {
        ...state,
        highScoreTotal: action.payload,
      };
    case 'CLEAR_HIGH_SCORE':
      return {
        ...state,
        highScoreTotal: 0,
      };
    case 'SET_HIGH_LEVEL':
      return {
        ...state,
        highLevel: action.payload,
      };
    case 'CLEAR_HIGH_LEVEL':
      return {
        ...state,
        highLevel: 1,
      };
    case 'SET_CURRENT_SCORE':
      return {
        ...state,
        currentScore: action.payload,
      };
    case 'CLEAR_CURRENT_SCORE':
      return {
        ...state,
        currentScore: 0,
      };
    case 'SET_LEVEL':
      return {
        ...state,
        currentLevel: action.payload,
      };
    case 'CLEAR_LEVEL':
      return {
        ...state,
        currentLevel: 1,
      };
    case 'ADD_SCORE':
      return {
        ...state,
        addedScore: action.payload,
      };
    default:
      return state;
  }
};
