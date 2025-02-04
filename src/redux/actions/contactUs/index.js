import { MakeProtectedApiCall } from "../../../utility/api";
import {
  CONTACT_GET_ERROR,
  GET_ALL_CONTACT,
  GET_CONTACT_REQUEST,
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

export const GET_ALL_CONTACTS = (
  offset,
  searchTerm,
  startDate,
  endDate
) => {
  return async (dispatch) => {
    dispatch({ type: GET_CONTACT_REQUEST, data: true });
    const url = `${baseUrl}/CONTACT/getAll?page=${offset}&limit=10&str=${searchTerm}&startDate=${startDate}&endDate=${endDate}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    if (res.status === 200) {
      dispatch({ type: GET_ALL_CONTACT, data: res?.data?.data });
    } else {
      dispatch({ type: CONTACT_GET_ERROR, data: [] });
    }
  };
};

export const GET_ALL_CONTACTS_EXPORT = (
  offset,
  searchTerm,
  startDate,
  endDate
) => {
  return async (dispatch) => {
    const url = `${baseUrl}/CONTACT/getAll?page=${offset}&limit=30000&str=${
      searchTerm || ""
    }&startDate=${startDate}&endDate=${endDate}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    return res?.data;
    // dispatch({ type: "GET_ALL_TEST", data:  });
  };
};