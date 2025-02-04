import {
  MakeAPiCallForRoutes,
  MakeProtectedApiCall,
} from "../../../utility/api";

// ** env backend url
const baseUrl = process.env.REACT_APP_BASE_URL;

// ** Headers
const getHeaders = () => {
  return {
    "x-auth-token": `bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
    "content-type": "application/json",
  };
};

export const GET_ALL_ORDER = (offset, str, startDate, endDate) => {
  return async (dispatch) => {
    const url = `${baseUrl}/booking/getAll?page=${offset}&limit=10&startDate=${startDate}&endDate=${endDate}&str=${
      str || ""
    }&paid=`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_ALL_ORDER", data: res?.data });
  };
};

export const GET_ALL_ORDER_EXPORT = (offset, str, startDate, endDate) => {
  return async (dispatch) => {
    const url = `${baseUrl}/booking/getAll?page=${offset}&limit=30000&startDate=${startDate}&endDate=${endDate}&str=${
      str || ""
    }&paid=`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    return res?.data;
    // dispatch({ type: "GET_ALL_TEST", data:  });
  };
};

export const PUT_PAYMENT_STATUS = (id, body) => {
  return async (dispatch) => {
    const url = `${baseUrl}/booking/status/${id}`;
    const res = await MakeProtectedApiCall(url, "PUT", getHeaders(), body);
    return res;
    // dispatch({ type: "GET_ALL_ORDER", data: res?.data });
  };
};
