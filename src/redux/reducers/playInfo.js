const INITIAL_MODAL_INFO_STATE = {
  startGame: 0,
};

export const playInfoReducer = (state = INITIAL_MODAL_INFO_STATE, action) => {
  switch (action.type) {
    case 'START_GAME':
      return {
        startGame: 1,
      };
    case 'RESTART_GAME':
      return {
        startGame: 2,
      };
    case 'END_GAME':
      return {
        startGame: 0,
      };
    default:
      return state;
  }
};
