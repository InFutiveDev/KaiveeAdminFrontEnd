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

export const GET_ALL_INQUIRIES = (offset, searchTerm, startDate, endDate) => {
  return async (dispatch) => {
    const url = `${baseUrl}/inquiry/getAll?page=${offset}&limit=10&str=${
      searchTerm || ""
    }&startDate=${startDate}&endDate=${endDate}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_ALL_INQUIRIES", data: res?.data });
  };
};
  
export const GET_ALL_INQUIRIES_EXPORT = (
  offset,
  searchTerm,
  startDate,
  endDate
) => {
  return async (dispatch) => {
    const url = `${baseUrl}/inquiry/getAll?page=${offset}&limit=30000&str=${
      searchTerm || ""
    }&startDate=${startDate}&endDate=${endDate}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    return res?.data;
    // dispatch({ type: "GET_ALL_TEST", data:  });
  };
};

export const DELETE_INQUIRY_BY_ADMIN = (inquiryId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/inquiry/delete/${inquiryId}`;
    const res = await MakeProtectedApiCall(url, "DELETE", getHeaders());
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      return { success: true, msg: res.data.msg };
    } else {
      return { success: false, msg: res.data?.msg };
    }
  };
};
