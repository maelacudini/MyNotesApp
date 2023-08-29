//This code is defining a reducer in a Redux application. A reducer is a function that specifies how the state of your application changes in response to actions.

import { REMOVE_ALERT, SET_ALERT } from "../actions/types";

// Define the initial state of alerts as an empty array
const initialState = [];

// The reducer function
export default function (state = initialState, action) {
  const { type, payload } = action;

  // The switch statement checks the action type and updates the state accordingly
  switch (type) {
    case SET_ALERT:
      // If the action type is SET_ALERT, add the new alert (payload) to the state
      return [...state, payload];
    case REMOVE_ALERT:
      // If the action type is REMOVE_ALERT, filter out the alert with the specified id
      return state.filter((alert) => alert.id !== payload);
    default:
      // If the action type doesn't match any cases, return the current state
      return state;
  }
}

/*
The ...state (spread operator) is used to create a new copy of the existing state array. It's a way to maintain immutability, which means that you're not modifying the original state directly, but rather creating a new version of it. Let's understand why this is important:

    1. Immutability:
        In Redux, maintaining immutability is crucial to ensure predictable state updates and to avoid unintended side effects.
        Instead of directly modifying the current state, you create a new copy with the desired changes.

    2. Using the Spread Operator (...):
        The spread operator is used to create a shallow copy of an array or object.
        ...state creates a new array containing all the elements of the original state array.

    3. Why it's Important:
        When you're updating the state in Redux, you want to create a new state object that reflects the changes while leaving the original state intact.
        This prevents unintended modification of the original state, which can lead to hard-to-debug issues.
*/
