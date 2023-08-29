import {
  CLEAR_USER,
  GET_USER,
  UPDATE_USER,
  USER_ERROR,
} from "../actions/types";

const initialState = {
  user: null,
  loading: true,
  error: {},
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_USER:
      return {
        ...state,
        user: null,
        loading: false,
      };
    case GET_USER:
    case UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user, // Keep the existing user data
          ...payload, // Update with new values from payload
        },
        loading: false,
      };
    case USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default userReducer;
