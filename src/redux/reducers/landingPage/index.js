import {
  GET_ALL_LANDING,
  LANDING_GET_ERROR,
  GET_LANDING_REQUEST,
  ADD_LANDING_ERROR,
  ADD_LANDING,
  GET_LANDING_BY_ID,
  DELETE_LANDING_ERROR,
  DELETE_LANDING_BY_ID,
  UPDATE_LANDING_ERROR,
  UPDATE_LANDING_BY_ID,
} from "../../constant";

// **  Initial State
const initialState = {
  landing: null,
  loading: false,
  error: false,
};

const LandingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LANDING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_LANDING:
      return {
        ...state,
        landing: action.data,
        loading: false,
      };
    case LANDING_GET_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case ADD_LANDING:
      return {
        ...state,
        loading: false,
        error: false,
        landing: action.data,
      };
    case ADD_LANDING_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case GET_LANDING_BY_ID:
    //   return {
    //     ...state,
    //     loading: false,
    //     Habits: action.data,
    //   };
    case DELETE_LANDING_BY_ID:
      return {
        ...state,
        loading: false,
        landing: action.data,
      };
    case DELETE_LANDING_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case UPDATE_LANDING_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case UPDATE_LANDING_BY_ID:
      return {
        ...state,
        loading: false,
        landing: action.data,
      };
    default:
      return state;
  }
};

export default LandingReducer;
