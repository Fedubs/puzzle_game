const INITIAL_MODAL_INFO_STATE = {
  isMainModalVisible: false,
  isStatsModalVisible: false,
  isProfileModalVisible: false,
  isConfirmModalVisible: false,
};

export const modalInfoReducer = (state = INITIAL_MODAL_INFO_STATE, action) => {
  switch (action.type) {
    case 'SHOW_MAIN_MODAL':
      return {
        isMainModalVisible: true,
      };
    case 'SHOW_STATS_MODAL':
      console.log('arrived.. stats modal');
      return {
        isStatsModalVisible: true,
      };
    case 'SHOW_PROFILE_MODAL':
      return {
        isProfileModalVisible: true,
      };
    case 'SHOW_CONFIRM_MODAL':
      return {
        isConfirmModalVisible: true,
      };
    case 'CLOSE_MAIN_MODAL':
      return {
        isMainModalVisible: false,
      };
    case 'CLOSE_STATS_MODAL':
      return {
        isStatsModalVisible: false,
      };
    case 'CLOSE_PROFILE_MODAL':
      return {
        isProfileModalVisible: false,
      };
    case 'CLOSE_CONFIRM_MODAL':
      return {
        isConfirmModalVisible: false,
      };
    default:
      return state;
  }
};
