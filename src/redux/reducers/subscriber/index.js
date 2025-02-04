import {
  GET_ALL_SUBSCRIBER,
  GET_SUBSCRIBER_REQUEST,
  SUBSCRIBER_GET_ERROR,
} from "../../constant";

// **  Initial State
const initialState = {
  subscriber: null,
  loading: false,
  error: false,
};

const SubscriberReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUBSCRIBER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_SUBSCRIBER:
      return {
        ...state,
        subscriber: action.data,
        loading: false,
      };
    case SUBSCRIBER_GET_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };

    default:
      return state;
  }
};

export default SubscriberReducer;
