// **  Initial State
const initialState = {
  menuByAdmin: null,
};

const menuByAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MENU_BY_ADMIN":
      return {
        ...state,
        menuByAdmin: action.data,
      };

    default:
      return state;
  }
};

export default menuByAdminReducer;
