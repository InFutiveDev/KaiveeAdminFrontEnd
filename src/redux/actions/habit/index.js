import { MakeProtectedApiCall } from "../../../utility/api";
import {
  ADD_HEBIT,
  DELETE_HABIT_BY_ID,
  DELETE_HABIT_ERROR,
  GET_ALL_HEBIT,
  GET_HABIT_BY_ID,
  GET_HABIT_REQUEST,
  HABIT_GET_ERROR,
  UPDATE_HABIT_BY_ID,
  UPDATE_HABIT_ERROR,
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

export const GET_ALL_HEBITS = (offset, searchTerm) => {
  return async (dispatch) => {
    dispatch({type: GET_HABIT_REQUEST,data:true});
    const url = `${baseUrl}/hebit/getAll?page=${offset}&limit=10&str=${
      searchTerm || ""
    }`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    if (res.status === 200) {
      dispatch({ type: GET_ALL_HEBIT, data: res?.data?.data });
    } else {
      dispatch({ type: HABIT_GET_ERROR, data: [] });
    }
  };
};

export const ADD_HEBIT_ADMIN = (payload) => {
  return async (dispatch) => {
    const formData = new FormData();
    formData.append("hebitName", payload.hebitName);
    formData.append("hebit_image", payload.hebit_image);
    formData.append("hebit_image_alt", payload.hebit_image_alt);
    formData.append("description", payload.description);
    const url = `${baseUrl}/hebit/add`;
    const res = await MakeProtectedApiCall(url, "POST", getHeaders(), formData);
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      dispatch({ type: ADD_HEBIT, data: res?.data });
      return { success: true, msg: res.data.msg };
    } else {
      dispatch({ type: ADD_HABBIT_ERROR, data: res.data?.msg  });
      return { success: false, msg: res.data?.msg };
    }
  };
};

export const HABIT_UPDATE_ADMIN = (habitId, payload) => {
  return async (dispatch) => {
    const formData = new FormData();
    formData.append("hebitName", payload.hebitName);
    formData.append("hebit_image", payload.hebit_image);
    formData.append("hebit_image_alt", payload.hebit_image_alt);
    formData.append("description", payload.description);
    const url = `${baseUrl}/hebit/update/${habitId}`;
    const res = await MakeProtectedApiCall(url, "PUT", getHeaders(), formData);
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      dispatch({ type: UPDATE_HABIT_BY_ID, data: res.data });
      return { success: true, msg: res.data.msg };
    } else {
      dispatch({ type: UPDATE_HABIT_ERROR, data: res.data?.msg });
      return { success: false, msg: res.data?.msg };
    }
  };
};

export const GET_HABIT_BY_ID_ADMIN = (habitId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/hebit/getById/${habitId}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: GET_HABIT_BY_ID, data: res?.data });
  };
};

export const DELETE_HEBIT_BY_ADMIN = (habitId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/hebit/delete/${habitId}`;
    const res = await MakeProtectedApiCall(url, "DELETE", getHeaders());
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      dispatch({ type: DELETE_HABIT_BY_ID, data: res?.data });
      return { success: true, msg: res.data.msg };
    } else {
      dispatch({ type: DELETE_HABIT_ERROR, data: res?.data?.msg });
      return { success: false, msg: res.data?.msg };
    }
  };
};
