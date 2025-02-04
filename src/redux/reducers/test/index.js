// **  Initial State
const initialState = {
  tests: null,
  test: null,
  habits: null
}

const manageTestReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_TEST':
      return {
        ...state,
        tests: action.data
      }
    case 'GET_TEST_BY_ID':
      return {
        ...state,
        test: action.data
      }
    case 'GET_ALL_HABITS':
      return {
        ...state,
        habits: action.data
      }
    default:
      return state
  }
}

export default manageTestReducer
