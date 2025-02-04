// **  Initial State
const initialState = {
  coupons: null,
  coupon: null,
}

const manageCouponReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_COUPONS':
      return {
        ...state,
        coupons: action.data
      }
    case 'GET_COUPON_BY_ID':
      return{
        ...state,
        coupon: action.data
      }
    default:
      return state
  }
}

export default manageCouponReducer
