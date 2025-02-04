import { MakeProtectedApiCall } from "../../../utility/api";
import {
  LANDING_GET_ERROR,
  GET_LANDING_REQUEST,
  GET_ALL_LANDING,
  ADD_LANDING,
  ADD_LANDING_ERROR,
  GET_LANDING_BY_ID,
  UPDATE_LANDING_ERROR,
  UPDATE_LANDING_BY_ID,
  DELETE_LANDING_BY_ID,
  DELETE_LANDING_ERROR,
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

export const GET_ALL_LANDINGS = (offset, searchTerm) => {
  return async (dispatch) => {
    dispatch({ type: GET_LANDING_REQUEST, data: true });
    const url = `${baseUrl}/landingData/getall?page=${offset}&limit=10&str=${searchTerm || ""
      }`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    if (res.status === 200) {
      dispatch({ type: GET_ALL_LANDING, data: res?.data?.data });
    } else {
      dispatch({ type: LANDING_GET_ERROR, data: [] });
    }
  };
};

export const ADD_LANDING_ADMIN = (payload) => {
  return async (dispatch) => {
    const formData = new FormData();
    Object.entries(payload).forEach((element) => {
      formData.append(element[0], element[1]);
    });
    const url = `${baseUrl}/landingData/add`;
    const res = await MakeProtectedApiCall(url, "POST", getHeaders(), formData);
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      dispatch({ type: ADD_LANDING, data: res?.data });
      return { success: true, msg: res.data.msg };
    } else {
      dispatch({ type: ADD_LANDING_ERROR, data: res.data?.msg });
      return { success: false, msg: res.data?.msg };
    }
  };
};

export const LANDING_UPDATE_ADMIN = (id, payload) => {
  return async (dispatch) => {
    const formData = new FormData()
    for (const key in payload) {
        formData.append(key, payload[key]);
    }
    const url = `${baseUrl}/landingData/update/${id}`;
    const res = await MakeProtectedApiCall(url, "PUT", getHeaders(), formData);
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      dispatch({ type: UPDATE_LANDING_BY_ID, data: res.data });
      return { success: true, msg: res.data.msg };
    } else {
      dispatch({ type: UPDATE_LANDING_ERROR, data: res.data?.msg });
      return { success: false, msg: res.data?.msg };
    }
  };
};


export const UPDATE_LANDING_TEST = (data, id) => {
  return async (dispatch) => {
    const url = `${baseUrl}/landingData/update_test/${id}`;
    const res = await MakeProtectedApiCall(url, "PUT", getHeaders(), data);

    if (res.status === 200 || res.status === 201 || res.status === 203) {
      return { success: true, msg: res.data.msg };
    } else {
      return { success: false, msg: res.data?.msg };
    }
    
  };
};

export const GET_LANDING_BY_ID_ADMIN = (habitId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/landingData/getById/${habitId}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: GET_LANDING_BY_ID, data: res?.data });
  };
};

export const DELETE_LANDING_BY_ADMIN = (landingId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/landingData/delete/${landingId}`;
    const res = await MakeProtectedApiCall(url, "DELETE", getHeaders());
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      dispatch({ type: DELETE_LANDING_BY_ID, data: res?.data });
      return { success: true, msg: res.data.msg };
    } else {
      dispatch({ type: DELETE_LANDING_ERROR, data: res?.data?.msg });
      return { success: false, msg: res.data?.msg };
    }
  };
};
