import {
  GET_ALL_HEBIT,
  GET_HABIT_BY_ID,
  DELETE_HABIT_BY_ID,
  UPDATE_HABIT_BY_ID,
  HABIT_GET_ERROR,
  DELETE_HABIT_ERROR,
  UPDATE_HABIT_ERROR,
  GET_HABIT_REQUEST,
  ADD_HEBIT,
  ADD_HABBIT_ERROR,
} from "../../constant";

// **  Initial State
const initialState = {
  Habits: null,
  loading: false,
  error: false,
};

const HebitReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HABIT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_HEBIT:
      return {
        ...state,
        Habits: action.data,
        loading:false
      };
    case HABIT_GET_ERROR:
      return {
        ...state,
        error: true,
        loading:false
      };
    case ADD_HEBIT:
      return {
        ...state,
        loading: false,
        error: false,
        Habits: action.data,
      };
    case ADD_HABBIT_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case GET_HABIT_BY_ID:
      return {
        ...state,
        loading:false,
        Habits: action.data,
      };
    case DELETE_HABIT_BY_ID:
      return {
        ...state,
        loading:false,
        Habits: action.data,
      };
    case DELETE_HABIT_ERROR:
      return {
        ...state,
        loading:false,
        error: true,
      };
    case UPDATE_HABIT_ERROR:
      return {
        ...state,
        loading:false,
        error: true,
      };
    case UPDATE_HABIT_BY_ID:
      return {
        ...state,
        loading:false,
        Habits: action.data,
      };
    default:
      return state;
  }
};

export default HebitReducer;
