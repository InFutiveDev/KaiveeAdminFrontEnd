// ** Initial State
const initialState = {
  categories: [],
  loading: false,
  error: null
}

// ** Notification Category Reducer
const notificationCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_NOTIFICATION_CATEGORIES":
      return {
        ...state,
        categories: action.payload?.data || [],
        loading: false,
        error: null
      }
    case "CREATE_NOTIFICATION_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.payload?.data],
        loading: false,
        error: null
      }
    case "UPDATE_NOTIFICATION_CATEGORY":
      return {
        ...state,
        categories: state.categories.map(category => 
          category._id === action.payload?.data?._id ? action.payload.data : category
        ),
        loading: false,
        error: null
      }
    case "DELETE_NOTIFICATION_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(category => category._id !== action.payload),
        loading: false,
        error: null
      }
    default:
      return state
  }
}

export default notificationCategoryReducer 