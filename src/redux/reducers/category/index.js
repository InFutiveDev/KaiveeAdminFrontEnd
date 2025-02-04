// **  Initial State
const initialState = {
  categories: null,
  category: null,
}

const manageCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_CATEGORIES':
      return {
        ...state,
        categories: action.data
      }
    case 'GET_CATEGORY_BY_ID':
      return {
        ...state,
        category: action.data
      }
    default:
      return state
  }
}

export default manageCategoryReducer
