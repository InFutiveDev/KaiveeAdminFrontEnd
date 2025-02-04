// **  Initial State
const initialState = {
  settingInfo: null,
}

const manageSettingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SETTING':
      return {
        ...state,
        settingInfo: action.data
      }
    default:
      return state
  }
}

export default manageSettingReducer
