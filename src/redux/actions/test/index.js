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

export const GET_ALL_TEST = (offset, searchTerm) => {
  return async (dispatch) => {
    const url = `${baseUrl}/test/getAll?page=${offset}&limit=10&str=${
      searchTerm || ""
    }`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_ALL_TEST", data: res?.data });
  };
};

export const GET_ALL_TEST_EXPORT = (offset, searchTerm) => {
  return async (dispatch) => {
    const url = `${baseUrl}/test/getAll?page=${offset}&limit=30000&str=${
      searchTerm || ""
    }`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    return res?.data;
    // dispatch({ type: "GET_ALL_TEST", data:  });
  };
};

export const GET_ALL_TEST_UPDATE = (offset, searchTerm) => {
  return async (dispatch) => {
    const url = `${baseUrl}/test/test-update`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    return res;
    // dispatch({ type: "GET_ALL_TEST", data:  });
  };
};

export const GET_TEST_BY_ID = (testId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/test/getById/${testId}`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_TEST_BY_ID", data: res?.data });
  };
};

export const CONTROL_FEATURE_TEST_BY_ID = (testId, data) => {
  return async (dispatch) => {
    const url = `${baseUrl}/test/update-feature/${testId}`;
    const res = await MakeProtectedApiCall(url, "PUT", getHeaders(), data);
    if (res?.status === 200) {
      return true;
    } else {
      return false;
    }
  };
};

export const TEST_UPDATE = (testId, payload) => {
  return async (dispatch) => {
    const headers = {
      "x-auth-token": `bearer ${JSON.parse(
        localStorage.getItem("accessToken")
      )}`,
      "content-type": "multipart/form-data",
    };
    const url = `${baseUrl}/test/update/${testId}`;

    const formdata = new FormData();
    delete payload["updatedAt"];
    delete payload["__v"];
    delete payload["_id"];
    for (let keyname in payload) {
      // if (payload[keyname]) {
      formdata.append(keyname, payload[keyname] || "");
      // }
    }
    const res = await MakeProtectedApiCall(url, "PUT", headers, formdata);
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      return { success: true, msg: res.data.msg };
    } else {
      return { success: false, msg: res.data?.msg };
    }
  };
};
export const PUT_TEST_STATUS = (id, body) => {
  return async (dispatch) => {
    const url = `${baseUrl}/test/testStatus/${id}`;
    const res = await MakeProtectedApiCall(url, "PUT", getHeaders(), body);
    return res;
    // dispatch({ type: "GET_ALL_ORDER", data: res?.data });
  };
};

export const DELETE_TEST_BY_ADMIN = (testId) => {
  return async (dispatch) => {
    const url = `${baseUrl}/test/delete/${testId}`;
    const res = await MakeProtectedApiCall(url, "DELETE", getHeaders());
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      return { success: true, msg: res.data.msg };
    } else {
      return { success: false, msg: res.data?.msg };
    }
  };
};

export const ADD_TEST_BY_ADMIN = (payload) => {
  return async (dispatch) => {
    const url = `${baseUrl}/test/add`;
    const headers = {
      "x-auth-token": `bearer ${JSON.parse(
        localStorage.getItem("accessToken")
      )}`,
      "content-type": "multipart/form-data",
    };

    const formdata = new FormData();
    for (let keyname in payload) {
      if (payload[keyname]) {
        formdata.append(keyname, payload[keyname] || "");
      }
    }
    const res = await MakeProtectedApiCall(url, "POST", headers, formdata);
    if (res.status === 200 || res.status === 201 || res.status === 203) {
      return { success: true, msg: res.data.msg };
    } else {
      return { success: false, msg: res.data?.msg };
    }
  };
};

export const GET_ALL_HABITS = () => {
  return async (dispatch) => {
    const url = `${baseUrl}/hebit/getAll`;
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: "GET_ALL_HABITS", data: res?.data });
  };
};
