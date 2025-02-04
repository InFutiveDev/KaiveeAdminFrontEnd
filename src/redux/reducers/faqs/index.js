// **  Initial State
const initialState = {
  getFaqsById: null,
};

const manageFaqsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_FAQS_BY_ID":
      return {
        ...state,
        getFaqsById: action.data,
      };
    default:
      return state;
  }
};

export default manageFaqsReducer;
