import { MakeProtectedApiCall } from "../../../utility/api";
import {
  APPOINTMENT_GET_ERROR,
  BIOWASTE_GET_ERROR,
  GET_ALL_APPOINTMENT,
  GET_ALL_BIOWASTE,
  GET_APPOINTMENT_REQUEST,
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
   
export const GET_ALL_APPOINTMENTS = (
  offset,
  searchTerm,
  startDate,
  endDate
) => {
  return async (dispatch) => {
    dispatch({ type: GET_APPOINTMENT_REQUEST, data: true });
    const url = `${baseUrl}/appointment/getAll?page=${offset}&limit=10&str=${searchTerm}&startDate=${startDate}&endDate=${endDate}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    if (res.status === 200) {
      dispatch({ type: GET_ALL_APPOINTMENT, data: res?.data?.data });
    } else {
      dispatch({ type: APPOINTMENT_GET_ERROR, data: [] });
    }
  };
};

export const GET_ALL_APPOINTMENTS_EXPORT = (
  offset,
  searchTerm,
  startDate,
  endDate
) => {
  return async (dispatch) => {
    const url = `${baseUrl}/appointment/getAll?page=${offset}&limit=30000&str=${
      searchTerm || ""
    }&startDate=${startDate}&endDate=${endDate}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    return res?.data;
    // dispatch({ type: "GET_ALL_TEST", data:  });
  };
};
