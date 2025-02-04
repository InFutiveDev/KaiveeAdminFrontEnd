import {
  MakeProtectedApiCall,
} from "../../../utility/api";

// ** env backend url
const baseUrl = process.env.REACT_APP_BASE_URL;

// ** Headers
const getHeaders = () => {
  return {
    "x-auth-token": `bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
    "content-type": "application/json",
  };
};

export const GET_ALL_LAB = (offset, str) => {
  return async (dispatch) => {
    const url = `${baseUrl}/lab-detail/getAll?page=${offset}&limit=10&str=${str || ''}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_ALL_LAB", data: res?.data });
  };
};
export const GET_ALL_LAB_WITHOUT_OFFSET = () => {
  return async (dispatch) => {
    const url = `${baseUrl}/lab-detail/getAll?page=1&limit=10000`;
    // const res = await MakeAPiCallForRoutes(url, getHeaders());
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_ALL_LAB_WITHOUT_OFFSET", data: res?.data });
  };
};
export const GET_LAB_BY_ID = (id) => {
  return async (dispatch) => {
    const url = `${baseUrl}/lab-detail/byId/${id}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_LAB_BY_ID", data: res?.data });
  };
};
export const GET_LAB_BY_ADMIN = () => {
  return async (dispatch) => {
    const url = `${baseUrl}/lab-detail/byUserId`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_LAB_BY_ADMIN", data: res?.data });
  };
};

export const ADD_LAB = (data) => {
  return async (dispatch) => {
    const url = `${baseUrl}/lab-detail/add`;
    const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
    dispatch({ type: "ADD_LAB", data: res?.data });
    return { success: res.data ? true : false, msg: res.data?.msg };
  };
};
export const UPDATE_LAB = (id, data) => {
  return async (dispatch) => {
    const url = `${baseUrl}/lab-detail/update/${id}`;
    const res = await MakeProtectedApiCall(url, "PUT", getHeaders(), data);
    dispatch({ type: "UPDATE_LAB", data: res?.data });
    return { success: res.data ? true : false, msg: res.data?.msg };
  };
};
export const DELETE_LAB = (id) => {
  return async (dispatch) => {
    const url = `${baseUrl}/lab-detail/delete/${id}`;
    const res = await MakeProtectedApiCall(url, "DELETE", getHeaders());
    dispatch({ type: "UPDATE_LAB", data: res?.data });
    return { success: res.data ? true : false, msg: res.data?.msg };
  };
};
