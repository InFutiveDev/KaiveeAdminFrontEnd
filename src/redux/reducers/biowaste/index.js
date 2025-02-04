import {
  ADD_BIOWASTE,
  ADD_BIOWASTE_ERROR,
  BIOWASTE_GET_ERROR,
  DELETE_BIOWASTE_BY_ID,
  DELETE_BIOWASTE_ERROR,
  GET_ALL_BIOWASTE,
  GET_BIOWASTE_BY_ID,
  GET_BIOWASTE_REQUEST,
  UPDATE_BIOWASTE_BY_ID,
  UPDATE_BIOWASTE_ERROR,
} from "../../constant";

// **  Initial State
const initialState = {
  bioWaste: null,
  loading: false,
  error: false,
};

const BiowasteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BIOWASTE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_BIOWASTE:
      return {
        ...state,
        bioWaste: action.data,
        loading: false,
      };
    case BIOWASTE_GET_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case ADD_BIOWASTE:
      return {
        ...state,
        loading: false,
        error: false,
        bioWaste: action.data,
      };
    case ADD_BIOWASTE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case GET_BIOWASTE_BY_ID:
    //   return {
    //     ...state,
    //     loading: false,
    //     Habits: action.data,
    //   };
    case DELETE_BIOWASTE_BY_ID:
      return {
        ...state,
        loading: false,
        bioWaste: action.data,
      };
    case DELETE_BIOWASTE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case UPDATE_BIOWASTE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case UPDATE_BIOWASTE_BY_ID:
      return {
        ...state,
        loading: false,
        bioWaste: action.data,
      };
    default:
      return state;
  }
};

export default BiowasteReducer;
