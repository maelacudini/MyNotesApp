import { REMOVE_ALERT, SET_ALERT } from "../actions/types";
import { v4 as uuidv4 } from "uuid";

export const setAlert =
  (msg, alertType, timeout = 5000) =>
  (dispatch) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

/*
An action creator is a function that returns an action object. 
In Redux, actions are plain JavaScript objects that describe changes in the application's state. 
The purpose of this action creator is to create and dispatch two types of actions: SET_ALERT and REMOVE_ALERT.

The setAlert action creator takes two parameters: msg (message) and alertType. 
It returns another function that takes dispatch as a parameter. 
This pattern of returning a function is possible due to a middleware called Redux Thunk, 
which allows handling asynchronous actions in Redux.

Inside the returned function, the action creator generates a unique id using the uuidv4 function from the "uuid" library. 
It then dispatches a SET_ALERT action with a payload containing the msg, alertType, and id. 
After that, it sets up a setTimeout to dispatch a REMOVE_ALERT action after a certain timeout period. 
The REMOVE_ALERT action's payload is the same id that was generated earlier.


1. When you call the setAlert action creator function, it creates and dispatches two actions:

    A SET_ALERT action with the alert data (message, alertType, and id) as the payload.
    A REMOVE_ALERT action (after a specified timeout) with the same id as the payload.

2. The actions dispatched by the setAlert function are received by the reducer. The reducer function listens for these actions and updates the application state accordingly.

    When the SET_ALERT action is dispatched, the reducer adds the alert data to the state array.
    When the REMOVE_ALERT action is dispatched (after the specified timeout), the reducer filters out the alert with the corresponding id from the state array.

So, to summarize, the setAlert function dispatches actions, and those actions are processed by the reducer to update the state. 
This way, you establish a unidirectional flow of data in Redux: 
actions trigger state updates through reducers, and components can react to those updates by subscribing to the updated state.
*/
