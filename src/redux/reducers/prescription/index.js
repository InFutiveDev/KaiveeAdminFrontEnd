import {
  GET_ALL_PRESCRIPTION,
  GET_PRESCRIPTION_REQUEST,
  PRESCRIPTION_GET_ERROR,
} from "../../constant";

// **  Initial State
const initialState = {
  prescription: null,
  loading: false,
  error: false,
};

const PrescriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRESCRIPTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_PRESCRIPTION:
      return {
        ...state,
        prescription: action.data,
        loading: false,
      };
    case PRESCRIPTION_GET_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };

    default:
      return state;
  }
};

export default PrescriptionReducer;
