import { MakeProtectedApiCall } from "../../../utility/api";
import {
  GET_ALL_SUBSCRIBER,
  GET_SUBSCRIBER_REQUEST,
  SUBSCRIBER_GET_ERROR,
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

export const GET_ALL_SUBSCRIBERS = (
  offset,
  searchTerm,
  startDate,
  endDate
) => {
  
  return async (dispatch) => {
    dispatch({ type: GET_SUBSCRIBER_REQUEST, data: true });
    const url = `${baseUrl}/subscriber/getAll?page=${offset}&limit=10&str=${searchTerm}&startDate=${startDate}&endDate=${endDate}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    console.log("dlfdlkf", res);
    if (res.status === 200) {
      dispatch({ type: GET_ALL_SUBSCRIBER, data: res?.data?.data });
    } else {
      dispatch({ type: SUBSCRIBER_GET_ERROR, data: [] });
    }
  };
};

export const GET_ALL_SUBSCRIBERS_EXPORT = (
  offset,
  searchTerm,
  startDate,
  endDate
) => {
  return async (dispatch) => {
    const url = `${baseUrl}/subscriber/getAll?page=${offset}&limit=30000&str=${
      searchTerm || ""
    }&startDate=${startDate}&endDate=${endDate}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    return res?.data;
    // dispatch({ type: "GET_ALL_TEST", data:  });
  };
};