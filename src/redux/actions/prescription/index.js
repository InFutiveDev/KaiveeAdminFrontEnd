import { MakeProtectedApiCall } from "../../../utility/api";
import {
  GET_ALL_PRESCRIPTION,
  GET_PRESCRIPTION_REQUEST,
  PRESCRIPTION_GET_ERROR,
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

export const GET_ALL_PRESCRIPTIONS = (offset, str, startDate, endDate) => {
  return async (dispatch) => {
    dispatch({ type: GET_PRESCRIPTION_REQUEST, data: true });
    const url = `${baseUrl}/prescription/getAll?page=${offset}&limit=10&str=${str}&startDate=${startDate}&endDate=${endDate}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    if (res.status === 200) {
      dispatch({ type: GET_ALL_PRESCRIPTION, data: res?.data?.data });
    } else {
      dispatch({ type: PRESCRIPTION_GET_ERROR, data: [] });
    }
  };
};

export const GET_ALL_PRESCRIPTIONS_EXPORT = (
  offset,
  searchTerm,
  startDate,
  endDate
) => {
  return async (dispatch) => {
    const url = `${baseUrl}/prescription/getAll?page=${offset}&limit=30000&str=${
      searchTerm || ""
    }&startDate=${startDate}&endDate=${endDate}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    return res?.data;
    // dispatch({ type: "GET_ALL_TEST", data:  });
  };
};
