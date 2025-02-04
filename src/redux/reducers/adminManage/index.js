// **  Initial State
const initialState = {
  adminManageList: null,
  adminManageByID: null,
};

const adminManageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ADMIN_MANAGE":
      return {
        ...state,
        adminManageList: action.data,
      };
    case "GET_ADMIN_MANAGE_BY_ID":
      return {
        ...state,
        adminManageByID: action.data,
      };
    default:
      return state;
  }
};

export default adminManageReducer;
