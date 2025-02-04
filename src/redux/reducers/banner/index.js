// **  Initial State
const initialState = {
  banners: null,
  banner: null
}

const manageBannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_BANNERS':
      return {
        ...state,
        banners: action.data
      }
    case 'GET_BANNER_BY_ID':
      return {
        ...state,
        banner: action.data
      }
    default:
      return state
  }
}

export default manageBannerReducer
