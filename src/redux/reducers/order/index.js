// **  Initial State
const initialState = {
  menuAllList: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_ORDER":
      action?.data?.data?.bookingData?.forEach((element) => {
        let today = new Date(
          element?.sampleCollectionDateTime
        ).toLocaleString();
        element["sampleCollectionDateTime"] = today;
        // element["is_paid"] = element?.payment?.is_paid;
      });
      return {
        ...state,
        menuAllList: action.data,
      };

    default:
      return state;
  }
};

export default orderReducer;
