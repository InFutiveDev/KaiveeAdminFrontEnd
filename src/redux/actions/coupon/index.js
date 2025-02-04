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

export const GET_ALL_COUPONS = (offset, searchTerm) => {
  return async (dispatch) => {
    const url = `${baseUrl}/coupon/getAll?page=${offset}&limit=10&str=${
      searchTerm || ""
    }`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_ALL_COUPONS", data: res?.data });
  };
};

export const GET_COUPON_BY_ID = (couponId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/coupon/getById/${couponId}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_COUPON_BY_ID", data: res?.data });
  };
};

export const COUPON_UPDATE = (couponId, payload) => {
  return async (dispatch) => {
    const url = `${baseUrl}/coupon/update/${couponId}`;
    const res = await MakeProtectedApiCall(url, "PUT", getHeaders(), payload);
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      return { success: true, msg: res.data.msg };
    } else {
      return { success: false, msg: res.data?.msg };
    }
  };
};

export const DELETE_COUPON_BY_ADMIN = (couponId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/coupon/delete/${couponId}`;
    const res = await MakeProtectedApiCall(url, "DELETE", getHeaders());
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      return { success: true, msg: res.data.msg };
    } else {
      return { success: false, msg: res.data?.msg };
    }
  };
};

export const ADD_COUPON_BY_ADMIN = (payload) => {
  return async (dispatch) => {
    const url = `${baseUrl}/coupon/add`;
    const res = await MakeProtectedApiCall(url, "POST", getHeaders(), payload);
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      return { success: true, msg: res.data.msg };
    } else {
      return { success: false, msg: res.data?.msg };
    }
  };
};
