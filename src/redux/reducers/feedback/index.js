// **  Initial State
const initialState = {
  feedback: null,
};

const manageFeedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_FEEDBACK":
      return {
        ...state,
        feedback: action.data,
      };
    default:
      return state;
  }
};

export default manageFeedbackReducer;
