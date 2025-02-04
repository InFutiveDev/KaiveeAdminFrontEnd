
export const GLOBAL_LOADING = (status) => {
  return async dispatch => {
    dispatch({ type: 'GLOBAL_LOADING', status })
  }
}
