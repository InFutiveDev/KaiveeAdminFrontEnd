// **  Initial State
const initialState = {
  careersList: null,
  careersByID: null,
  careersListWithoutOffest: null,
};

const careersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_CAREERS":
      return {
        ...state,
        careersList: action.data,
      };
    case "GET_CAREERS_BY_ID":
      return {
        ...state,
        careersByID: action.data,
      };
    case "GET_ALL_CAREERS_WITHOUT_OFFSET":
      return {
        ...state,
        careersListWithoutOffest: action.data,
      };

    default:
      return state;
  }
};

export default careersReducer;
