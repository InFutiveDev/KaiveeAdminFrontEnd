import {
  APPOINTMENT_GET_ERROR,
  GET_ALL_APPOINTMENT,
  GET_APPOINTMENT_REQUEST,
} from "../../constant";

// **  Initial State
const initialState = {
  data: null,
  loading: false,
  error: false,
};

const AppointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_APPOINTMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_APPOINTMENT:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case APPOINTMENT_GET_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };

    default:
      return state;
  }
};

export default AppointmentReducer;
