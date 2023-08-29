import api from "../utils/api";
import {
  GET_NOTE,
  GET_NOTES,
  ADD_NOTE,
  DELETE_NOTE,
  NOTE_ERROR,
  COMPLETE_NOTE,
  EDIT_NOTE,
} from "../actions/types";
import { setAlert } from "./alert";

// Get a single note by ID
export const getNote = (noteId) => async (dispatch) => {
  try {
    const res = await api.get(`/notes/${noteId}`);
    dispatch({
      type: GET_NOTE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NOTE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all notes for a user
export const getNotes = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/notes/${userId}/notes`);
    dispatch({
      type: GET_NOTES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NOTE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create a new note
export const addNote = (input) => async (dispatch) => {
  try {
    const res = await api.post("/notes", input);
    dispatch({
      type: ADD_NOTE,
      payload: res.data,
    });
    setAlert("Note added!", "success");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: NOTE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete a note by ID
export const deleteNote = (noteId) => async (dispatch) => {
  try {
    await api.delete(`/notes/${noteId}`);
    dispatch({
      type: DELETE_NOTE,
      payload: noteId,
    });
  } catch (err) {
    dispatch({
      type: NOTE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Toggle the completed status of a note
export const toggleNoteCompleted = (noteId) => async (dispatch) => {
  try {
    const res = await api.put(`/notes/completed/${noteId}`);
    dispatch({
      type: COMPLETE_NOTE,
      payload: res.data.completed,
    });
  } catch (err) {
    dispatch({
      type: NOTE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit a note by ID
export const editNote = (noteId, noteData) => async (dispatch) => {
  try {
    const res = await api.put(`/notes/edit/${noteId}`, noteData);
    dispatch({
      type: EDIT_NOTE,
      payload: res.data.note,
    });
    setAlert("Note modified!", "success");
  } catch (err) {
    dispatch({
      type: NOTE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    setAlert("An error occurred", "danger");
  }
};
