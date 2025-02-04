// **  Initial State
const initialState = {
  corporate: null,
};

const manageCorporateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_CORPORATE":
      return {
        ...state,
        corporate: action.data,
      };
    default:
      return state;
  }
};

export default manageCorporateReducer;
