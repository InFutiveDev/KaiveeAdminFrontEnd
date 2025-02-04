// **  Initial State
const initialState = {
  menuAllList: null,
  menuByID: null,
  menuAllListWithoutOffest: null,
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_MENU":
      return {
        ...state,
        menuAllList: action.data,
      };
    case "GET_MENU_BY_ID":
      return {
        ...state,
        menuByID: action.data,
      };
    case "GET_ALL_MENU_WITHOUT_OFFSET":
      return {
        ...state,
        menuAllListWithoutOffest: action.data,
      };

    default:
      return state;
  }
};

export default menuReducer;
