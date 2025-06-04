// ** Initial State
const initialState = {
  notifications: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0
}

// ** Notification Reducer
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload?.data?.notifications || [],
        total: action.payload?.data?.total || 0,
        page: action.payload?.data?.page || 1,
        limit: action.payload?.data?.limit || 10,
        totalPages: action.payload?.data?.totalPages || 0
      }
    default:
      return state
  }
}

export default notificationReducer