// **  Initial State
const initialState = {
  adminRoleList: null,
  adminRoleByID: null,
};

const adminRoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ADMIN_ROLE":
      return {
        ...state,
        adminRoleList: action.data,
      };
    case "GET_ADMIN_ROLE_BY_ID":
      return {
        ...state,
        adminRoleByID: action.data,
      };
    default:
      return state;
  }
};

export default adminRoleReducer;
