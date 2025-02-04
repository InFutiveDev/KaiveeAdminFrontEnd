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

export const GET_ALL_HEALTH_RISKS = (offset, searchTerm, limit = 10) => {
  return async dispatch => {
    const url = `${baseUrl}/healthRisk/getAll?page=${offset}&limit=${limit}&str=${searchTerm || ''}`
    const res = await MakeProtectedApiCall(url, 'GET', getHeaders())
    dispatch({ type: 'GET_ALL_HEALTH_RISKS', data: res?.data })
  }
}

export const GET_HEALTH_RISKS_BY_ID = (riskId) => {
  return async dispatch => {
    const url = `${baseUrl}/healthRisk/getById/${riskId}`
    const res = await MakeProtectedApiCall(url, 'GET', getHeaders())
    dispatch({ type: 'GET_HEALTH_RISKS_BY_ID', data: res?.data })
  }
}

export const HEALTH_RISKS_UPDATE = (riskId, payload) => {
  return async dispatch => {
    const formData = new FormData();
    formData.append('healthRiskTitle', payload.healthRiskTitle)
    formData.append('healthRisk_image', payload.healthRisk_image)
    formData.append('healthRisk_image_alt', payload.healthRisk_image_alt)
    formData.append('description', payload.description)
    const url = `${baseUrl}/healthRisk/update/${riskId}`
    const res = await MakeProtectedApiCall(url, 'PUT', getHeaders(), formData)
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      return { success: true, msg: res.data.msg }
    } else {
      return { success: false, msg: res.data?.msg }
    }
  }
}

export const DELETE_HEALTH_RISKS_BY_ADMIN = (riskId) => {
  return async dispatch => {
    const url = `${baseUrl}/healthRisk/delete/${riskId}`
    const res = await MakeProtectedApiCall(url, 'DELETE', getHeaders())
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      return { success: true, msg: res.data.msg }
    } else {
      return { success: false, msg: res.data?.msg }
    }
  }
}

export const ADD_HEALTH_RISKS_BY_ADMIN = (payload) => {
  const headers = {
    "x-auth-token": `bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
    "content-type": "multipart/form-data"
  }
  return async dispatch => {
    const formData = new FormData();
    formData.append('healthRiskTitle', payload.healthRiskTitle)
    formData.append('healthRisk_image', payload.healthRisk_image)
    formData.append('healthRisk_image_alt', payload.healthRisk_image_alt)
    formData.append('description', payload.description)
    const url = `${baseUrl}/healthRisk/add`
    const res = await MakeProtectedApiCall(url, 'POST', getHeaders(), formData)
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      return { success: true, msg: res.data.msg }
    } else {
      return { success: false, msg: res.data?.msg }
    }
  }
}
