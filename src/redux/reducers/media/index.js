import {
    GET_MEDIA,
    GET_MEDIA_BY_ID,
    DELETE_MEDIA_BY_ID,
    UPDATE_MEDIA_BY_ID,
    MEDIA_GET_ERROR,
    DELETE_MEDIA_ERROR,
    UPDATE_MEDIA_ERROR,
    GET_MEDIA_REQUEST,
    ADD_MEDIA,
    ADD_MEDIA_ERROR,
  } from "../../constant";
  
  // **  Initial State
  const initialState = {
    media: null,
    loading: false,
    error: false,
  };
  
  const MediaReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_MEDIA_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_MEDIA:
        return {
          ...state,
          media: action.data,
          loading:false
        };
      case MEDIA_GET_ERROR:
        return {
          ...state,
          error: true,
          loading:false
        };
      case ADD_MEDIA:
        return {
          ...state,
          loading: false,
          error: false,
          media: action.data,
        };
      case ADD_MEDIA_ERROR:
        return {
          ...state,
          loading: false,
          error: true,
        };
      case GET_MEDIA_BY_ID:
        return {
          ...state,
          loading:false,
          media: action.data,
        };
      case DELETE_MEDIA_BY_ID:
        return {
          ...state,
          loading:false,
          media: action.data,
        };
      case DELETE_MEDIA_ERROR:
        return {
          ...state,
          loading:false,
          error: true,
        };
      case UPDATE_MEDIA_ERROR:
        return {
          ...state,
          loading:false,
          error: true,
        };
      case UPDATE_MEDIA_BY_ID:
        return {
          ...state,
          loading:false,
          media: action.data,
        };
      default:
        return state;
    }
  };
  
  export default MediaReducer;
  