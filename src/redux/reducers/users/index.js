// **  Initial State
const initialState = {
  users: null,
  userInfo: null
}

const manageUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_USERS':
      return {
        ...state,
        users: action.data
      }
    case 'GET_USER_BY_ID':
      return {
        ...state,
        userInfo: action.data
      }
    default:
      return state
  }
}

export default manageUsersReducer
