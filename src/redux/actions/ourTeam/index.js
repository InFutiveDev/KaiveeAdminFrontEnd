import { MakeProtectedApiCall } from "../../../utility/api";
import {
  OURTEAM_GET_ERROR,
  GET_OURTEAM_REQUEST,
  GET_ALL_OURTEAM,
  ADD_OURTEAM,
  ADD_OURTEAM_ERROR,
  GET_OURTEAM_BY_ID,
  UPDATE_OURTEAM_ERROR,
  UPDATE_OURTEAM_BY_ID,
  DELETE_OURTEAM_BY_ID,
  DELETE_OURTEAM_ERROR,
} from "../../constant/index";

// ** env backend url
const baseUrl = process.env.REACT_APP_BASE_URL;

// ** Headers
const getHeaders = () => {
  return {
    "x-auth-token": `bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
    "content-type": "application/json",
  };
};

export const GET_ALL_OURTEAMS = (offset, searchTerm) => {
  return async (dispatch) => {
    dispatch({ type: GET_OURTEAM_REQUEST, data: true });
    const url = `${baseUrl}/team/getAll?page=${offset}&limit=10&str=${
      searchTerm || ""
    }`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    console.log("res---->>", res);
    if (res.status === 200) {
      dispatch({ type: GET_ALL_OURTEAM, data: res?.data?.data });
    } else {
      dispatch({ type: OURTEAM_GET_ERROR, data: [] });
    }
  };
};

export const ADD_OURTEAM_ADMIN = (payload) => {
  return async (dispatch) => {
    const formData = new FormData();
    Object.entries(payload).forEach((element) => {
      formData.append(element[0], element[1]);
    });
    const url = `${baseUrl}/team/add`;
    const res = await MakeProtectedApiCall(url, "POST", getHeaders(), formData);
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      dispatch({ type: ADD_OURTEAM, data: res?.data });
      return { success: true, msg: res.data.msg };
    } else {
      dispatch({ type: ADD_OURTEAM_ERROR, data: res.data?.msg });
      return { success: false, msg: res.data?.msg };
    }
  };
};

export const OURTEAM_UPDATE_ADMIN = (id, payload) => {
  return async (dispatch) => {
    const formData = new FormData();
    for (const key in payload) {
      formData.append(key, payload[key]);
    }
    const url = `${baseUrl}/team/update-team/${id}`;
    const res = await MakeProtectedApiCall(url, "PUT", getHeaders(), formData);
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      dispatch({ type: UPDATE_OURTEAM_BY_ID, data: res.data });
      return { success: true, msg: res.data.msg };
    } else {
      dispatch({ type: UPDATE_OURTEAM_ERROR, data: res.data?.msg });
      return { success: false, msg: res.data?.msg };
    }
  };
};

export const GET_OURTEAM_BY_ID_ADMIN = (habitId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/team/getByid/${habitId}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: GET_OURTEAM_BY_ID, data: res?.data });
  };
};

export const DELETE_OURTEAM_BY_ADMIN = (OURTEAMId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/team/delete-team/${OURTEAMId}`;
    const res = await MakeProtectedApiCall(url, "DELETE", getHeaders());
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      dispatch({ type: DELETE_OURTEAM_BY_ID, data: res?.data });
      return { success: true, msg: res.data.msg };
    } else {
      dispatch({ type: DELETE_OURTEAM_ERROR, data: res?.data?.msg });
      return { success: false, msg: res.data?.msg };
    }
  };
};
