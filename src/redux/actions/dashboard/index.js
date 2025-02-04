
import { MakeProtectedApiCall } from "../../../utility/api"

// ** env backend url 
const baseUrl = process.env.REACT_APP_BASE_URL

// ** Headers
const getHeaders = () => {
  return {
    "x-auth-token": `bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
    "content-type": "application/json"
  }
}

export const GET_NEW_REGISTERS = (days) => {
  return async dispatch => {
    try {
      const url = `${baseUrl}/graph/user?days=${days}`
      const res = await MakeProtectedApiCall(url, 'GET', getHeaders())
      dispatch({ type: 'GET_NEW_REGISTERS', data: res?.data?.data })
    } catch (error) {

    }
  }
}

export const GET_NEW_COLLECTIONS = (days) => {
  return async dispatch => {
    try {
      const url = `${baseUrl}/graph/collection?days=${days}`
      const res = await MakeProtectedApiCall(url, 'GET', getHeaders())
      dispatch({ type: 'GET_NEW_COLLECTIONS', data: res?.data?.data })
    } catch (error) {

    }
  }
}

export const GET_WITHDRAWAL_PROCESSED = (days) => {
  return async dispatch => {
    try {
      const url = `${baseUrl}/graph/withdraw-amount?days=${days}`
      const res = await MakeProtectedApiCall(url, 'GET', getHeaders())
      dispatch({ type: 'GET_WITHDRAWAL_PROCESSED', data: res?.data?.data })
    } catch (error) {

    }
  }
}

export const GET_WITHDRAWAL_REQUEST = (days) => {
  return async dispatch => {
    try {
      const url = `${baseUrl}/graph/withdraw-request?days=${days}`
      const res = await MakeProtectedApiCall(url, 'GET', getHeaders())
      dispatch({ type: 'GET_WITHDRAWAL_REQUEST', data: res?.data?.data })
    } catch (error) {

    }
  }
}


export const GET_TOTAL_EARNED = (days) => {
  return async dispatch => {
    try {
      const url = `${baseUrl}/graph/fee?days=${days}`
      const res = await MakeProtectedApiCall(url, 'GET', getHeaders())
      dispatch({ type: 'GET_TOTAL_EARNED', data: res?.data?.data })
    } catch (error) {

    }
  }
}


export const GET_ROYALTY = (days) => {
  return async dispatch => {
    try {
      const url = `${baseUrl}/graph/royalty?days=${days}`
      const res = await MakeProtectedApiCall(url, 'GET', getHeaders())
      dispatch({ type: 'GET_ROYALTY', data: res?.data?.data })
    } catch (error) {

    }
  }
}

export const GET_SALE = (days) => {
  return async dispatch => {
    try {
      const url = `${baseUrl}/graph/sale?days=${days}`
      const res = await MakeProtectedApiCall(url, 'GET', getHeaders())
      dispatch({ type: 'GET_SALE', data: res?.data?.data })
    } catch (error) {

    }
  }
}

export const GET_ITEMS = (days) => {
  return async dispatch => {
    try {
      const url = `${baseUrl}/graph/item?days=${days}`
      const res = await MakeProtectedApiCall(url, 'GET', getHeaders())
      dispatch({ type: 'GET_ITEMS', data: res?.data?.data })
    } catch (error) {

    }
  }
}

export const GET_STRIPE_FEE = (days) => {
  return async dispatch => {
    try {
      const url = `${baseUrl}/graph/stripeFee?days=${days}`
      const res = await MakeProtectedApiCall(url, 'GET', getHeaders())
      dispatch({ type: 'GET_STRIPE_FEE', data: res?.data?.data })
    } catch (error) {

    }
  }
}

export const GET_DASHBOARD_COUNTS = () => {
  return async dispatch => {
    const url = `${baseUrl}/dashboard`
    const res = await MakeProtectedApiCall(url, 'GET', getHeaders())
    // console.log("counts res.data: ", res.data)
    dispatch({ type: 'GET_DASHBOARD_COUNTS', data: res?.data?.data })
  }
}

export const GET_ADMIN_BALANCE = () => {
  return async dispatch => {
    const url = `${baseUrl}/admin-balance`
    const res = await MakeProtectedApiCall(url, 'GET', getHeaders())
    // console.log("res.data: ", res.data)
    if (res?.data) {
      dispatch({ type: 'GET_ADMIN_BALANCE', data: res?.data?.data })
    }
  }
}