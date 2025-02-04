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

export const GET_ALL_CATEGORIES = (offset, limit = 10, searchTerm) => {
  return async (dispatch) => {
    const url = `${baseUrl}/category/getAll?page=${offset}&limit=${
      limit || 10
    }&str=${searchTerm || ""}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_ALL_CATEGORIES", data: res?.data });
  };
};

export const GET_CATEGORY_BY_ID = (categoryId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/category/getById/${categoryId}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_CATEGORY_BY_ID", data: res?.data });
  };
};

export const ADD_CATEGORY_BY_ADMIN = (payload) => {
  const headers = {
    "x-auth-token": `bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
    "content-type": "multipart/form-data",
  };
  return async (dispatch) => {
    const url = `${baseUrl}/category/add`;
    const formdata = new FormData();
    delete payload["updatedAt"];
    delete payload["__v"];
    delete payload["_id"];
    for (let keyname in payload) {
      if (payload[keyname]) {
        formdata.append(keyname, payload[keyname] || "");
      }
    }

    if (payload["category_menu_active"] === 0) {
      formdata.append("category_menu_active", payload["category_menu_active"]);
    }
    const res = await MakeProtectedApiCall(url, "POST", headers, formdata);
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      return { success: true, msg: res.data.msg };
    } else {
      return { success: false, msg: res.data?.msg };
    }
  };
};

export const DELETE_CATEGORY_BY_ADMIN = (categoryId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/category/delete/${categoryId}`;
    const res = await MakeProtectedApiCall(url, "DELETE", getHeaders());
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      return { success: true, msg: res.data.msg };
    } else {
      return { success: false, msg: res.data?.msg };
    }
  };
};

export const CATEGORY_UPDATE = (categoryId, payload) => {
  const headers = {
    "x-auth-token": `bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
    "content-type": "multipart/form-data",
  };
  return async (dispatch) => {
    const url = `${baseUrl}/category/update/${categoryId}`;
    console.log("payload---->>>inner", payload);
    const formdata = new FormData();
    delete payload["updatedAt"];
    delete payload["__v"];
    delete payload["_id"];
    for (let keyname in payload) {
      if (payload[keyname]) {
        formdata.append(keyname, payload[keyname] || "null");
      }
    }
    if (payload["category_menu_active"] === 0) {
      formdata.append("category_menu_active", payload["category_menu_active"]);
    }
    const res = await MakeProtectedApiCall(url, "PUT", headers, formdata);
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      return { success: true, msg: res.data.msg };
    } else {
      return { success: false, msg: res.data?.msg };
    }
  };
};
