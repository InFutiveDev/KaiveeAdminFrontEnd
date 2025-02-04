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

export const GET_ALL_CAREERS = (offset, str) => {
  return async (dispatch) => {
    const url = `${baseUrl}/career/getAll?page=${offset}&limit=10&str=${
      str || ""
    }`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_ALL_CAREERS", data: res?.data });
  };
};
export const GET_ALL_CAREERS_WITHOUT_OFFSET = () => {
  return async (dispatch) => {
    const url = `${baseUrl}/career/getAll?page=1&limit=10000`;
    // const res = await MakeAPiCallForRoutes(url, getHeaders());
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_ALL_CAREERS_WITHOUT_OFFSET", data: res?.data });
  };
};
export const GET_CAREERS_BY_ID = (id) => {
  return async (dispatch) => {
    const url = `${baseUrl}/career/getbyId/${id}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_CAREERS_BY_ID", data: res?.data });
  };
};
export const GET_CAREERS_BY_ADMIN = () => {
  return async (dispatch) => {
    const url = `${baseUrl}/lab-detail/byUserId`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_CAREERS_BY_ADMIN", data: res?.data });
  };
};

export const ADD_CAREERS = (data) => {
  return async (dispatch) => {
    const url = `${baseUrl}/career/add-carrer`;
    const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
    dispatch({ type: "ADD_CAREERS", data: res?.data });
    return { success: res.data ? true : false, msg: res.data?.msg };
  };
};
export const UPDATE_CAREERS = (id, data) => {
  return async (dispatch) => {
    const url = `${baseUrl}/career/update/${id}`;
    const res = await MakeProtectedApiCall(url, "PUT", getHeaders(), data);
    dispatch({ type: "UPDATE_CAREERS", data: res?.data });
    return { success: res.data ? true : false, msg: res.data?.msg };
  };
};
export const DELETE_CAREERS = (id) => {
  return async (dispatch) => {
    const url = `${baseUrl}/career/delete/${id}`;
    const res = await MakeProtectedApiCall(url, "DELETE", getHeaders());
    dispatch({ type: "UPDATE_CAREERS", data: res?.data });
    return { success: res.data ? true : false, msg: res.data?.msg };
  };
};
