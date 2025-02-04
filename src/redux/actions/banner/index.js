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

export const GET_ALL_BANNERS = (offset) => {
  return async (dispatch) => {
    const url = `${baseUrl}/banner/getAll?page=${offset}&limit=10`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_ALL_BANNERS", data: res?.data });
  };
};

export const GET_BANNER_BY_ID = (bannerId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/banner/getById/${bannerId}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_BANNER_BY_ID", data: res?.data });
  };
};

export const ADD_BANNER_BY_ADMIN = (payload) => {
  return async (dispatch) => {
    const formData = new FormData();
    formData.append("banner_image", payload.banner_image);
    formData.append("banner_name", payload.banner_name);
    const url = `${baseUrl}/banner/add`;
    const res = await MakeProtectedApiCall(url, "POST", getHeaders(), formData);
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      return { success: true, msg: res.data.msg };
    } else {
      return { success: false, msg: res.data?.msg };
    }
  };
};

export const EDIT_BANNER_BY_ADMIN = (bannerId, payload) => {
  const headers = {
    "x-auth-token": `bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
    "content-type": "multipart/form-data",
  };
  return async (dispatch) => {
    const url = `${baseUrl}/banner/update/${bannerId}`;
    const formdata = new FormData();
    formdata.append("banner_name", payload.banner_name);
    formdata.append("banner_image", payload.banner_image);
    formdata.append("position", payload.position);
    const res = await MakeProtectedApiCall(url, "PUT", headers, formdata);
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      return { success: true, msg: res.data.msg };
    } else {
      return { success: false, msg: res.data?.msg };
    }
  };
};

export const DELETE_BANNER_BY_ADMIN = (bannerId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/banner/delete/${bannerId}`;
    const res = await MakeProtectedApiCall(url, "DELETE", getHeaders());
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      return { success: true, msg: res.data.msg };
    } else {
      return { success: false, msg: res.data?.msg };
    }
  };
};
