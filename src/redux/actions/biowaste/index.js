import { MakeProtectedApiCall } from "../../../utility/api";
import {
  ADD_BIOWASTE,
  ADD_BIOWASTE_ERROR,
  BIOWASTE_GET_ERROR,
  DELETE_BIOWASTE_BY_ID,
  DELETE_BIOWASTE_ERROR,
  GET_ALL_BIOWASTE,
  GET_BIOWASTE_BY_ID,
  GET_BIOWASTE_REQUEST,
} from "../../constant";

// ** env backend url
const baseUrl = process.env.REACT_APP_BASE_URL;

// ** Headers
const getHeaders = () => {
  return {
    "x-auth-token": `bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
    "content-type": "application/json",
  };
};

export const GET_ALL_BIOWASTES = (offset, searchTerm) => {
  return async (dispatch) => {
    dispatch({ type: GET_BIOWASTE_REQUEST, data: true });
    const url = `${baseUrl}/biowaste/get-all-waste?page=${offset}&limit=10`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    console.log("res0---->", res);
    if (res.status === 200) {
      dispatch({ type: GET_ALL_BIOWASTE, data: res?.data?.data });
    } else {
      dispatch({ type: BIOWASTE_GET_ERROR, data: [] });
    }
  };
};

export const GET_BIOWASTE_BY_ID_ADMIN = (habitId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/biowaste/getById/${habitId}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: GET_BIOWASTE_BY_ID, data: res?.data });
  };
};

export const DELETE_BIOWASTE_BY_ADMIN = (landingId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/biowaste/delete/${landingId}`;
    const res = await MakeProtectedApiCall(url, "DELETE", getHeaders());
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      return { success: true, msg: res.data.msg };
    } else {
      dispatch({ type: DELETE_BIOWASTE_ERROR, data: res?.data?.msg });
      return { success: false, msg: res.data?.msg };
    }
  };
};

export const ADD_BIOWASTE_ADMIN = (payload) => {
  return async (dispatch) => {
    const url = `${baseUrl}/biowaste/add-waste`;
    const res = await MakeProtectedApiCall(url, "POST", getHeaders(), payload);
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      dispatch({ type: ADD_BIOWASTE, data: res?.data });
      return { success: true, msg: res.data.msg };
    } else {
      dispatch({ type: ADD_BIOWASTE_ERROR, data: res.data?.msg });
      return { success: false, msg: res.data?.msg };
    }
  };
};

export const UPDATE_BIOWASTE_TEST = (data, id) => {
  return async (dispatch) => {
    const url = `${baseUrl}/biowaste/update/${id}`;
    const res = await MakeProtectedApiCall(url, "PUT", getHeaders(), data);

    if (res.status === 200 || res.status === 201 || res.status === 203) {
      return { success: true, msg: res.data.msg };
    } else {
      return { success: false, msg: res.data?.msg };
    }
  };
};
