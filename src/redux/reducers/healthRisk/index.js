// **  Initial State
const initialState = {
  healthRisks: null,
  healthRiskInfo: null,
}

const manageHealthRiskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_HEALTH_RISKS':
      return {
        ...state,
        healthRisks: action.data
      }
    case 'GET_HEALTH_RISKS_BY_ID':
      return {
        ...state,
        healthRiskInfo: action.data
      }
    default:
      return state
  }
}

export default manageHealthRiskReducer
