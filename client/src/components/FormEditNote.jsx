import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import { editNote } from "../actions/notes";
import Alert from "./Alert";
import { setAlert } from "../actions/alert";

const show = {
  opacity: 1,
  display: "block",
  duration: "0.5s",
};

const hide = {
  opacity: 0,
  transitionEnd: {
    display: "none",
  },
  duration: "0.5s",
};

const FormEditNote = ({
  toggleFormEditNote,
  note,
  user,
  editNote,
  setAlert,
  alert,
}) => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    keyword: "",
  });

  const { title, description, keyword } = input;

  function handleSubmit(e) {
    e.preventDefault();
    editNote(note._id, input);
    setAlert("Note changed!", "success");
  }

  return (
    <motion.section animate={toggleFormEditNote ? show : hide}>
      <form onSubmit={handleSubmit} className="mt-3">
        <Alert />
        <div className="mb-3">
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            placeholder={note.title}
            value={title}
            onChange={(e) => setInput({ ...input, title: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <textarea
            type="text"
            name="description"
            id="description"
            className="form-control"
            value={description}
            placeholder={note.description}
            onChange={(e) =>
              setInput({ ...input, description: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="keyword"
            id="keyword"
            className="form-control"
            placeholder={note.keyword}
            value={keyword}
            onChange={(e) => setInput({ ...input, keyword: e.target.value })}
          />
        </div>

        <div>
          <button type="submit" className="btn btn-light">
            Send
          </button>
        </div>
      </form>
    </motion.section>
  );
};

FormEditNote.propTypes = {
  editNote: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  alert: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({ alert: state.alert });

export default connect(mapStateToProps, { editNote, setAlert })(FormEditNote);
