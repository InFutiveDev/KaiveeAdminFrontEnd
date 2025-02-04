import { MakeProtectedApiCall } from "../../../utility/api";
import {
  ADD_MEDIA,
  ADD_MEDIA_ERROR,
  GET_MEDIA,
  GET_MEDIA_REQUEST,
  MEDIA_GET_ERROR,
  UPDATE_MEDIA_ERROR,
  GET_MEDIA_BY_ID,
  UPDATE_MEDIA_BY_ID,
  DELETE_MEDIA_BY_ID,
  DELETE_MEDIA_ERROR,
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

export const GET_ALL_MEDIA = (offset, searchTerm) => {
  return async (dispatch) => {
    dispatch({type: GET_MEDIA_REQUEST,data:true});
    const url = `${baseUrl}/media/getAll?page=${offset}&limit=10&str=${
      searchTerm || ""
    }`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    if (res.status === 200) {
      dispatch({ type: GET_MEDIA, data: res?.data?.data });
    } else {
      dispatch({ type: MEDIA_GET_ERROR, data: [] });
    }
  };
};

export const ADD_MEDIA_ADMIN = (payload) => {
  return async (dispatch) => {
    const formData = new FormData();
    formData.append("link", payload.link);
    formData.append("media", payload.media);
    formData.append("text", payload.text);
    const url = `${baseUrl}/media/add`;
    const res = await MakeProtectedApiCall(url, "POST", getHeaders(), formData);
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      dispatch({ type: ADD_MEDIA, data: res?.data });
      return { success: true, msg: res.data.msg };
    } else {
      dispatch({ type: ADD_MEDIA_ERROR, data: res.data?.msg  });
      return { success: false, msg: res.data?.msg };
    }
  };
};

export const MEDIA_UPDATE_ADMIN = (mediaId, payload) => {
  return async (dispatch) => {
    const formData = new FormData();
    formData.append("media", payload.media);
    formData.append("link", payload.link);
    formData.append("text", payload.text);
    const url = `${baseUrl}/media/update/${mediaId}`;
    const res = await MakeProtectedApiCall(url, "PUT", getHeaders(), formData);
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      dispatch({ type: UPDATE_MEDIA_BY_ID, data: res.data });
      return { success: true, msg: res.data.msg };
    } else {
      dispatch({ type: UPDATE_MEDIA_ERROR, data: res.data?.msg });
      return { success: false, msg: res.data?.msg };
    }
  };
};

export const GET_MEDIA_BY_ID_ADMIN = (mediaId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/media/getById/${mediaId}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: GET_MEDIA_BY_ID, data: res?.data });
  };
};

export const DELETE_MEDIA_BY_ADMIN = (mediaId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/media/delete/${mediaId}`;
    const res = await MakeProtectedApiCall(url, "DELETE", getHeaders());
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      dispatch({ type: DELETE_MEDIA_BY_ID, data: res?.data });
      return { success: true, msg: res.data.msg };
    } else {
      dispatch({ type: DELETE_MEDIA_ERROR, data: res?.data?.msg });
      return { success: false, msg: res.data?.msg };
    }
  };
};
