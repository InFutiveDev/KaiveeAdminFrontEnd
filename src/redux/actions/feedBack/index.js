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

export const GET_ALL_FEEDBACK = (offset, searchTerm) => {
  return async (dispatch) => {
    const url = `${baseUrl}/feeds/getAll?page=${offset}&limit=10&str=${
      searchTerm || ""
    }`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());

    console.log("res", res);
    dispatch({ type: "GET_ALL_FEEDBACK", data: res?.data });
  };
};

export const DELETE_FEEDBACK_BY_ADMIN = (inquiryId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/feeds/delete/${inquiryId}`;
    const res = await MakeProtectedApiCall(url, "DELETE", getHeaders());
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      return { success: true, msg: res.data.msg };
    } else {
      return { success: false, msg: res.data?.msg };
    }
  };
};
