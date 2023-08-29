import {
  CLEAR_USER,
  USER_DELETED,
  UPDATE_USER,
  USER_ERROR,
  GET_USER,
} from "../actions/types";
import api from "../utils/api";
import { setAlert } from "./alert";
import { loadUser } from "./auth";

//get user
export const getUser = () => async (dispatch) => {
  try {
    const res = await api.get("/auth");

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//update user
export const updateUser = (formData, userId) => async (dispatch) => {
  const { name, password, password2 } = formData; // Destructure the formData

  try {
    const res = await api.put(`users/edit/${userId}`, {
      name,
      currentPassword: password, // Send the password as currentPassword
      newPassword: password2, // Send the new password as newPassword
    });

    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });

    dispatch(setAlert("User Updated", "success"));

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: USER_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });

    dispatch(loadUser());
  }
};

//delete user
export const deleteUser = () => async (dispatch) => {
  if (window.confirm("Are you sure? This action cannot be undone.")) {
    try {
      await api.delete("/users");

      dispatch({ type: CLEAR_USER });
      dispatch({ type: USER_DELETED });

      dispatch(setAlert("Your account has been permanently deleted"));
    } catch (error) {
      dispatch({
        type: USER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
