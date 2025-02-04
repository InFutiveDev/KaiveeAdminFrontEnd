// **  Initial State
const initialState = {
 labList: null,
 labByID: null,
 labListWithoutOffest: null,
};

const labReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_LAB":
      return {
        ...state,
       labList: action.data,
      };
    case "GET_LAB_BY_ID":
      return {
        ...state,
       labByID: action.data,
      };
    case "GET_ALL_LAB_WITHOUT_OFFSET":
      return {
        ...state,
       labListWithoutOffest: action.data,
      };

    default:
      return state;
  }
};

export default labReducer;
