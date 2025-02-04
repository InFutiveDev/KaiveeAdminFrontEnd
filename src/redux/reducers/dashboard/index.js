// **  Initial State
const initialState = {
  graphnewRegister: [],
  graphCollection: [],
  graphWithdrawalprocessed: [],
  graphwithdrawalRequests: [],
  graphEarned: [],
  graphroyalty: [],
  graphpaidSeller: [],
  graphNFTs: [],
  graphStripe: [],
  counts: {
    totalUsers: 0,
    verifiedUsers: 0,
    nonVerifiedUsers: 0,
    googleUsers: 0,
    metamaskUsers: 0,
    emailUsers: 0,
    kycVerifiedUsers: 0,
    kycNonVerifiedUsers: 0,
    totalCollection: 0,
    totalArtWorks: 0,
    mintedArtWorks: 0
  },
  adminBalance: {
    balance: 0,
    crypto: "ETH"
  }
}

const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NEW_REGISTERS':
      return {
        ...state,
        graphnewRegister: action.data
      }
    case 'GET_NEW_COLLECTIONS':
      return {
        ...state,
        graphCollection: action.data
      }
    case 'GET_WITHDRAWAL_PROCESSED':
      return {
        ...state,
        graphWithdrawalprocessed: action.data
      }
    case 'GET_WITHDRAWAL_REQUEST':
      return {
        ...state,
        graphwithdrawalRequests: action.data
      }
    case 'GET_TOTAL_EARNED':
      return {
        ...state,
        graphEarned: action.data
      }
    case 'GET_ROYALTY':
      return {
        ...state,
        graphroyalty: action.data
      }
    case 'GET_SALE':
      return {
        ...state,
        graphpaidSeller: action.data
      }
    case 'GET_ITEMS':
      return {
        ...state,
        graphNFTs: action.data
      }
    case 'GET_STRIPE_FEE':
      return {
        ...state,
        graphStripe: action.data
      }
    case 'GET_DASHBOARD_COUNTS': 
      return {
        ...state,
        counts: action.data 
      }
    case 'GET_ADMIN_BALANCE': 
    return {
      ...state,
      adminBalance: action.data
    }
    default:
      return state
  }
}

export default DashboardReducer
