// **  Initial State
const initialState = {
  inquiries: null,
}

const manageInquiryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_INQUIRIES':
      return {
        ...state,
        inquiries: action.data
      }
    default:
      return state
  }
}

export default manageInquiryReducer
