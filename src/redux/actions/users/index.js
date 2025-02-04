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

export const GET_ALL_USERS = (offset, searchTerm) => {
  return async dispatch => {
    const url = `${baseUrl}/user/getAll?page=${offset}&limit=10&str=${searchTerm || ''}`
    const res = await MakeProtectedApiCall(url, 'GET', getHeaders())
    dispatch({ type: 'GET_ALL_USERS', data: res?.data })
  }
}

export const ADD_USER_BY_ADMIN = (payload) => {
  return async dispatch => {
    const url = `${baseUrl}/user/add`
    const res = await MakeProtectedApiCall(url, 'POST', getHeaders(), payload)
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      return { success: true, msg: res.data.msg }
    } else {
      return { success: false, msg: res.data?.msg }
    }
    // dispatch({ type: 'ADD_USER_BY_ADMIN', data: res?.data })
  }
}


export const DELETE_USER_BY_ADMIN = (userId) => {
  return async dispatch => {
    const url = `${baseUrl}/user/delete/${userId}`
    const res = await MakeProtectedApiCall(url, 'DELETE', getHeaders())
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      return { success: true, msg: res.data.msg }
    } else {
      return { success: false, msg: res.data?.msg }
    }
  }
}

export const SEARCH_ALL_USER_BY_NAME = (offset, searchTerm) => {
  return async dispatch => {
    const url = `${baseUrl}/user/getAll?page=${offset}&limit=10&str=${searchTerm || ''}`
    const res = await MakeProtectedApiCall(url, 'GET', getHeaders())
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      dispatch({ type: 'GET_ALL_USERS', data: res?.data })
      return { success: true, msg: res.data.msg }
    } else {
      dispatch({ type: 'GET_ALL_USERS', data: [] })
      return { success: false, msg: res.data?.msg }
    }
  }
}
