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

export const GET_ALL_FRANCHISES = (offset, searchTerm, startDate, endDate) => {
  return async (dispatch) => {
    const url = `${baseUrl}/franchise/getAll?page=${offset}&limit=10&str=${
      searchTerm || ""
    }&startDate=${startDate}&endDate=${endDate}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_ALL_FRANCHISES", data: res?.data });
  };
};

export const GET_ALL_FRANCHISES_EXPORT = (
  offset,
  searchTerm,
  startDate,
  endDate
) => {
  return async (dispatch) => {
    const url = `${baseUrl}/franchise/getAll?page=${offset}&limit=30000&str=${
      searchTerm || ""
    }&startDate=${startDate}&endDate=${endDate}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    return res?.data;
    // dispatch({ type: "GET_ALL_TEST", data:  });
  };
};
