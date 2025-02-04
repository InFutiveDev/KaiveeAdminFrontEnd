// **  Initial State
const initialState = {
    globalLoading: null
}

const manageGlobalLoadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GLOBAL_LOADING':
            return {
                ...state,
                globalLoading: action.status
            }
        default:
            return state
    }
}

export default manageGlobalLoadingReducer
