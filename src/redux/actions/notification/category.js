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

// Action Types
export const GET_NOTIFICATION_CATEGORIES = "GET_NOTIFICATION_CATEGORIES";
export const CREATE_NOTIFICATION_CATEGORY = "CREATE_NOTIFICATION_CATEGORY";
export const UPDATE_NOTIFICATION_CATEGORY = "UPDATE_NOTIFICATION_CATEGORY";
export const DELETE_NOTIFICATION_CATEGORY = "DELETE_NOTIFICATION_CATEGORY";

// Get All Notification Categories
export const getNotificationCategories = () => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/notification/category`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      dispatch({ type: GET_NOTIFICATION_CATEGORIES, payload: res?.data });
      return { success: true, data: res?.data };
    } catch (error) {
      console.error('Error fetching notification categories:', error);
      return { success: false, error };
    }
  };
};

// Create Notification Category
export const createNotificationCategory = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/notification/category`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
      if (res.status === 200 || res.status === 201 || res.status === 203) {
        dispatch({ type: CREATE_NOTIFICATION_CATEGORY, payload: res?.data });
        return { success: true, msg: res.data.msg };
      } else {
        return { success: false, msg: res.data?.msg };
      }
    } catch (error) {
      console.error('Error creating notification category:', error);
      return { success: false, msg: error?.response?.data?.msg || 'Failed to create category' };
    }
  };
};

// Update Notification Category
export const updateNotificationCategory = (id, data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/notification/category/${id}`;
      const res = await MakeProtectedApiCall(url, "PUT", getHeaders(), data);
      if (res.status === 200 || res.status === 201 || res.status === 203) {
        dispatch({ type: UPDATE_NOTIFICATION_CATEGORY, payload: res?.data });
        return { success: true, msg: res.data.msg };
      } else {
        return { success: false, msg: res.data?.msg };
      }
    } catch (error) {
      console.error('Error updating notification category:', error);
      return { success: false, msg: error?.response?.data?.msg || 'Failed to update category' };
    }
  };
};

// Delete Notification Category
export const deleteNotificationCategory = (id) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/notification/category-delete/${id}`;
      const res = await MakeProtectedApiCall(url, "DELETE", getHeaders());
      if (res.status === 200 || res.status === 201 || res.status === 203) {
        dispatch({ type: DELETE_NOTIFICATION_CATEGORY, payload: id });
        return { success: true, msg: res.data.msg };
      } else {
        return { success: false, msg: res.data?.msg };
      }
    } catch (error) {
      console.error('Error deleting notification category:', error);
      return { success: false, msg: error?.response?.data?.msg || 'Failed to delete category' };
    }
  };
}; 