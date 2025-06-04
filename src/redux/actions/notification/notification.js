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
export const CREATE_NOTIFICATION = "CREATE_NOTIFICATION";
export const CREATE_NOTIFICATION_BULK = "CREATE_NOTIFICATION_BULK";
export const GET_NOTIFICATIONS = "GET_NOTIFICATIONS";
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";

// Create Notification
export const createNotification = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/notification/create-notification`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
      if (res.status === 200 || res.status === 201 || res.status === 203) {
        dispatch({ type: CREATE_NOTIFICATION, payload: res?.data });
        return { success: true, msg: res.data.msg };
      } else {
        return { success: false, msg: res.data?.msg || 'Failed to create notification' };
      }
    } catch (error) {
      console.error('Error creating notification:', error);
      return { success: false, msg: error?.response?.data?.msg || 'Failed to create notification' };
    }
  };
};

// Create Bulk Notification
export const createNotificationBulk = (data) => {
  return async (dispatch) => {
    const url = `${baseUrl}/notification/create-notification/bulk`;
    const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
    dispatch({ type: CREATE_NOTIFICATION_BULK, payload: res?.data });
  };
};

// Get All Notifications
export const getNotifications = (page = 1, searchTerm = '', user = '', category = '') => {
  return async (dispatch) => {
    let url = `${baseUrl}/notification/get?page=${page}&limit=10`;
    
    // Add search parameter if exists
    if (searchTerm) {
      url += `&search=${searchTerm}`;
    }
    
    // Add user parameter if exists
    if (user) {
      url += `&user=${user}`;
    }

    // Add category parameter if exists
    if (category) {
      url += `&category=${category}`;
    }
    
    const res = await MakeProtectedApiCall(url, "GET", getHeaders());
    dispatch({ type: GET_NOTIFICATIONS, payload: res?.data });
  };
};

// Delete Notification
export const deleteNotification = (id) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/notification/delete/${id}`;
      await MakeProtectedApiCall(url, "DELETE", getHeaders());
      dispatch({ type: DELETE_NOTIFICATION, payload: id });
      return { success: true };
    } catch (error) {
      console.error('Error deleting notification:', error);
      return { success: false, error };
    }
  };
};