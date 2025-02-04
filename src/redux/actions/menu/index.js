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

export const GET_ALL_MENU = (offset, str) => {
  return async (dispatch) => {
    const url = `${baseUrl}/menu/getAll?page=${offset}&limit=10&str=${str || ''}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_ALL_MENU", data: res?.data });
  };
};
export const GET_ALL_MENU_WITHOUT_OFFSET = () => {
  return async (dispatch) => {
    const url = `${baseUrl}/menu/getAll?page=1&limit=10000`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_ALL_MENU_WITHOUT_OFFSET", data: res?.data });
  };
};
export const GET_MENU_BY_ID = (id) => {
  return async (dispatch) => {
    const url = `${baseUrl}/menu/byId/${id}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_MENU_BY_ID", data: res?.data });
  };
};
export const GET_MENU_BY_ADMIN = () => {
  return async (dispatch) => {
    const url = `${baseUrl}/menu/byUserId`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_MENU_BY_ADMIN", data: res?.data });
  };
};

export const ADD_MENU = (data) => {
  return async (dispatch) => {
    const url = `${baseUrl}/menu/add`;
    const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
    dispatch({ type: "ADD_MENU", data: res?.data });
    return { success: res.data ? true : false, msg: res.data?.msg };
  };
};
export const UPDATE_MENU = (id, data) => {
  return async (dispatch) => {
    const url = `${baseUrl}/menu/update/${id}`;
    const res = await MakeProtectedApiCall(url, "PUT", getHeaders(), data);
    dispatch({ type: "UPDATE_MENU", data: res?.data });
    return { success: res.data ? true : false, msg: res.data?.msg };
  };
};
export const DELETE_MENU = (id) => {
  return async (dispatch) => {
    const url = `${baseUrl}/menu/delete/${id}`;
    const res = await MakeProtectedApiCall(url, "DELETE", getHeaders());
    dispatch({ type: "UPDATE_MENU", data: res?.data });
    return { success: res.data ? true : false, msg: res.data?.msg };
  };
};
