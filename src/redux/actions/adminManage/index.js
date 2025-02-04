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

export const ADD_ADMIN_MANAGE = (data) => {
  return async (dispatch) => {
    const url = `${baseUrl}/admin/add`;
    const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
    dispatch({ type: "ADD_ADMIN_MANAGE", data: res?.data });
    return { success: res.data ? true : false, msg: res.data?.msg };
  };
};
export const UPDATE_ADMIN_MANAGE = (id, data) => {
  return async (dispatch) => {
    const url = `${baseUrl}/admin/update/${id}`;
    const res = await MakeProtectedApiCall(url, "PUT", getHeaders(), data);
    dispatch({ type: "UPDATE_ADMIN_MANAGE", data: res?.data });
    return { success: res.data ? true : false, msg: res.data?.msg };
  };
};

export const GET_ADMIN_MANAGE = (offset, str) => {
  return async (dispatch) => {
    const url = `${baseUrl}/admin/getAll?page=${offset}&limit=10&str=${str || ''}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_ADMIN_MANAGE", data: res?.data });
  };
};
export const DELETE_ADMIN_MANAGE = (id) => {
  return async (dispatch) => {
    const url = `${baseUrl}/admin/delete/${id}`;
    const res = await MakeProtectedApiCall(url, "DELETE", getHeaders());
    dispatch({ type: "DELETE_ADMIN_MANAGE", data: res?.data });
    return { success: res.data ? true : false, msg: res.data?.msg };
  };
};
export const GET_ADMIN_MANAGE_BY_ID = (id) => {
  return async (dispatch) => {
    const url = `${baseUrl}/admin/byId/${id}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_ADMIN_MANAGE_BY_ID", data: res?.data });
  };
};
