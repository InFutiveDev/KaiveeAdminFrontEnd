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

export const ADD_FAQS_BY_ID = (payload) => {
  return async (dispatch) => {
    const url = `${baseUrl}/faq/add-faq`;
    const res = await MakeProtectedApiCall(url, "POST", getHeaders(), payload);
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      return { success: true, msg: res.data.msg };
    } else {
      return { success: false, msg: res.data?.msg };
    }
  };
};
export const UPDATE_FAQS_BY_ID = (payload, id) => {
  return async (dispatch) => {
    const url = `${baseUrl}/faq/update-faq/${id}`;
    const res = await MakeProtectedApiCall(url, "PUT", getHeaders(), payload);
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      return { success: true, msg: res.data.msg };
    } else {
      return { success: false, msg: res.data?.msg };
    }
  };
};

export const DELETE_FAQ = (testId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/faq/delete-faq/${testId}`;
    const res = await MakeProtectedApiCall(url, "DELETE", getHeaders());
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      return { success: true, msg: res.data.msg };
    } else {
      return { success: false, msg: res.data?.msg };
    }
  };
};

export const GET_FAQS_BY_ID = (id, page = 1, limit = 10, str = "") => {
  return async (dispatch) => {
    const url = `${baseUrl}/faq/getBy_id/${id}?page=${page}&limit=${limit}&str=${str}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_FAQS_BY_ID", data: res?.data });
  };
};
