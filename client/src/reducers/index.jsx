import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import notes from "./notes";
import user from "./user";

export default combineReducers({
  //add all reducers created
  alert,
  auth,
  notes,
  user,
});
