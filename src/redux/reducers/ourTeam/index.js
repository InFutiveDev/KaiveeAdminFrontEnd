import {
  GET_ALL_OURTEAM,
  OURTEAM_GET_ERROR,
  GET_OURTEAM_REQUEST,
  ADD_OURTEAM_ERROR,
  ADD_OURTEAM,
  GET_OURTEAM_BY_ID,
  DELETE_OURTEAM_ERROR,
  DELETE_OURTEAM_BY_ID,
  UPDATE_OURTEAM_ERROR,
  UPDATE_OURTEAM_BY_ID,
} from "../../constant";

// **  Initial State
const initialState = {
  ourTeam: null,
  loading: false,
  error: false,
};

const OurTeamReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OURTEAM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_OURTEAM:
      return {
        ...state,
        ourTeam: action.data,
        loading: false,
      };
    case OURTEAM_GET_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case ADD_OURTEAM:
      return {
        ...state,
        loading: false,
        error: false,
        ourTeam: action.data,
      };
    case ADD_OURTEAM_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case GET_OURTEAM_BY_ID:
    //   return {
    //     ...state,
    //     loading: false,
    //     Habits: action.data,
    //   };
    case DELETE_OURTEAM_BY_ID:
      return {
        ...state,
        loading: false,
        ourTeam: action.data,
      };
    case DELETE_OURTEAM_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case UPDATE_OURTEAM_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case UPDATE_OURTEAM_BY_ID:
      return {
        ...state,
        loading: false,
        ourTeam: action.data,
      };
    default:
      return state;
  }
};

export default OurTeamReducer;
