// **  Initial State
const initialState = {
  franchises: null,
};

const franchisesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_FRANCHISES":
      return {
        ...state,
        franchises: action.data,
      };
    default:
      return state;
  }
};

export default franchisesReducer;
