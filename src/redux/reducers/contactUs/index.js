import {
  GET_ALL_CONTACT,
  GET_CONTACT_REQUEST,
  CONTACT_GET_ERROR,
} from "../../constant";

// **  Initial State
const initialState = {
  contact: null,
  loading: false,
  error: false,
};

const ContactReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_CONTACT:
      return {
        ...state,
        contact: action.data,
        loading: false,
      };
    case CONTACT_GET_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };

    default:
      return state;
  }
};

export default ContactReducer;
