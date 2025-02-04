import { MakeProtectedApiCall } from "../../../utility/api";

// ** env backend url
const baseUrl = process.env.REACT_APP_BASE_URL;

// ** Headers
const getHeaders = () => {
  return {
    "x-auth-token": `bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
    "content-type": "application/json",
  };
};

export const ADD_ADMIN_ROLE = (data) => {
  return async (dispatch) => {
    const url = `${baseUrl}/adminRole/add`;
    const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
    dispatch({ type: "ADD_ADMIN_ROLE", data: res?.data });
    return { success: res.data ? true : false, msg: res.data?.msg };
  };
};
export const UPDATE_ADMIN_ROLE = (id, data) => {
  return async (dispatch) => {
    const url = `${baseUrl}/adminRole/update/${id}`;
    const res = await MakeProtectedApiCall(url, "PUT", getHeaders(), data);
    dispatch({ type: "UPDATE_ADMIN_ROLE", data: res?.data });
    return { success: res.data ? true : false, msg: res.data?.msg };
  };
};

export const GET_ADMIN_ROLE = (offset, str) => {
  return async (dispatch) => {
    const url = `${baseUrl}/adminRole/getAll?page=${offset}&limit=10&str=${str || ''}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_ADMIN_ROLE", data: res?.data });
  };
};
export const DELETE_ADMIN_ROLE = (id) => {
  return async (dispatch) => {
    const url = `${baseUrl}/adminRole/delete/${id}`;
    const res = await MakeProtectedApiCall(url, "DELETE", getHeaders());
    dispatch({ type: "DELETE_ADMIN_ROLE", data: res?.data });
    return { success: res.data ? true : false, msg: res.data?.msg };
  };
};
export const GET_ADMIN_ROLE_BY_ID = (id) => {
  return async (dispatch) => {
    const url = `${baseUrl}/adminRole/byId/${id}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_ADMIN_ROLE_BY_ID", data: res?.data });
  };
};
