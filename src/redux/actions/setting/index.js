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

export const GET_SETTING = () => {
  return async dispatch => {
    const url = `${baseUrl}/setting/getAll`
    const res = await MakeProtectedApiCall(url, 'GET', getHeaders())
    dispatch({ type: 'GET_SETTING', data: res?.data })
  }
}

export const UPDATE_SETTING_BY_ADMIN = (payload) => {
  return async dispatch => {
    const url = `${baseUrl}/setting/update/${payload._id}`
    const res = await MakeProtectedApiCall(url, 'PUT', getHeaders(), payload)
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      return { success: true, msg: res.data.msg }
    } else {
      return { success: false, msg: res.data?.msg }
    }
  }
}