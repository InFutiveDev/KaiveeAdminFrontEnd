import {
  GET_ALL_APPLIEDJOB,
  GET_APPLIEDJOB_REQUEST,
  APPLIEDJOB_GET_ERROR,
} from "../../constant";

// **  Initial State
const initialState = {
  data: null,
  loading: false,
  error: false,
};

const AppliedJobReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_APPLIEDJOB_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_APPLIEDJOB:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case APPLIEDJOB_GET_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };

    default:
      return state;
  }
};

export default AppliedJobReducer;
