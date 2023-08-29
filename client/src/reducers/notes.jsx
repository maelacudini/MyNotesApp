import {
  GET_NOTE,
  GET_NOTES,
  DELETE_NOTE,
  ADD_NOTE,
  NOTE_ERROR,
  COMPLETE_NOTE,
  EDIT_NOTE,
} from "../actions/types";

const initialState = {
  note: null,
  notes: [],
  error: {},
  loading: true,
};

function noteReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTE:
      return {
        ...state,
        note: payload,
        loading: false,
      };
    case GET_NOTES:
      return {
        ...state,
        notes: payload,
        loading: false,
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: [payload, ...state.notes],
        loading: false,
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== payload),
        loading: false,
      };
    case NOTE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case COMPLETE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note._id === payload ? { ...note, completed: !note.completed } : note
        ),
        loading: false,
      };
    case EDIT_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note._id === payload._id ? payload : note
        ),
        loading: false,
      };
    default:
      return state;
  }
}

export default noteReducer;
