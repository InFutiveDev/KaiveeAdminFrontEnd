import { MakeProtectedApiCall } from "../../../utility/api";
import {
  GET_ALL_APPLIEDJOB,
  GET_APPLIEDJOB_REQUEST,
  APPLIEDJOB_GET_ERROR,
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

export const GET_ALL_APPLIEDJOBS = (offset, searchTerm, startDate, endDate) => {
  return async (dispatch) => {
    dispatch({ type: GET_APPLIEDJOB_REQUEST, data: true });
    const url = `${baseUrl}/carrer-form/getAll?page=${offset}&limit=10&str=${searchTerm}&startDate=${startDate}&endDate=${endDate}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    if (res.status === 200) {
      dispatch({ type: GET_ALL_APPLIEDJOB, data: res?.data?.data });
    } else {
      dispatch({ type: APPLIEDJOB_GET_ERROR, data: [] });
    }
  };
};

export const GET_ALL_APPLIEDJOBS_EXPORT = (
  offset,
  searchTerm,
  startDate,
  endDate
) => {
  return async (dispatch) => {
    const url = `${baseUrl}/carrer-form/getAll?page=${offset}&limit=30000&str=${
      searchTerm || ""
    }&startDate=${startDate}&endDate=${endDate}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    return res?.data;
    // dispatch({ type: "GET_ALL_TEST", data:  });
  };
};