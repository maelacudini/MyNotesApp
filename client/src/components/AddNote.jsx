import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "../css/app.module.css";
import { addNote } from "../actions/notes";
import { connect } from "react-redux";
import Alert from "./Alert";
import { setAlert } from "../actions/alert";
import { motion } from "framer-motion";

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

const AddNote = ({ isVisible, addNote, setAlert, alert }) => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    keyword: "",
  });

  const { title, description, keyword } = input;

  function handleFormAdd(e) {
    e.preventDefault();
    addNote(input);
  }

  function resetForm() {
    setInput({
      title: "",
      description: "",
      keyword: "",
    });
  }

  return (
    <motion.section className="mb-3" animate={isVisible ? show : hide}>
      <form onSubmit={handleFormAdd} className={style.card}>
        <Alert />
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Water the plants"
            value={title}
            onChange={(e) => setInput({ ...input, title: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            placeholder="Remember to water the plants today!"
            value={description}
            onChange={(e) =>
              setInput({ ...input, description: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="keyword" className="form-label">
            Keyword
          </label>
          <input
            type="text"
            className="form-control"
            id="keyword"
            value={keyword}
            placeholder="plants"
            onChange={(e) => setInput({ ...input, keyword: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-light me-3">
          Add
        </button>
        <a className="btn btn-dark" onClick={resetForm}>
          Reset Form
        </a>
      </form>
    </motion.section>
  );
};

AddNote.propTypes = {
  addNote: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  alert: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps, { addNote, setAlert })(AddNote);
