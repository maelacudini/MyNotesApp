import React, { useEffect, useState } from "react";
import { motion, Reorder } from "framer-motion";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import style from "../css/app.module.css";
import { deleteNote, getNotes } from "../actions/notes";
import { getUser } from "../actions/user";
import Loading from "./Loading";
import Filter from "./Filter";
import AddNote from "./AddNote";
import FormEditNote from "./FormEditNote";

const Notes = ({ notes, user, getUser, getNotes, deleteNote }) => {
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const [searchQuery, setSearchQuery] = useState("");
  const [editFormsVisibility, setEditFormsVisibility] = useState(
    notes.map(() => false)
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    getUser();
    getNotes(user._id);
  }, [getUser, getNotes, user._id]);

  useEffect(() => {
    const filtered = notes.filter((note) =>
      note.keyword.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchQuery, notes]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section className={style.notes}>
      <img
        src="https://uploads-ssl.webflow.com/62e13f095b5c9d5f50d0eff2/62e230d85b3d5b641d7b163d_Humaaans%20-%203%20Characters%20(5)%201.svg"
        alt="huumans"
        height={"auto"}
        width={"100%"}
      />

      <Filter handleSearch={handleSearch} />

      <div className="d-flex justify-content-between align-items-center">
        <h5>Got any new ideas?</h5>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsVisible(!isVisible)}
          className="btn btn-dark mb-3"
        >
          {isVisible ? "Close" : "Add Note"}
        </motion.button>
      </div>
      <AddNote isVisible={isVisible} />

      <Reorder.Group
        axis="y"
        values={filteredNotes}
        onReorder={setFilteredNotes}
        className="p-0"
      >
        {filteredNotes ? (
          filteredNotes.length !== 0 ? (
            filteredNotes.map((note, index) => (
              <Reorder.Item
                key={note._id}
                value={note}
                className={`mb-3 list-unstyled ${style.card}`}
              >
                <div className="d-flex justify-content-between align-items-baseline">
                  <h5>{note.title}</h5>
                  <small>
                    {new Date(note.date).toDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </small>
                </div>
                <hr />
                <div key={index} className="mb-3">
                  <p>{note.description}</p>
                  {note.keyword.split(" ").map((key) => (
                    <span>#{key} </span>
                  ))}
                </div>
                <div>
                  <button
                    onClick={() => {
                      const newVisibility = [...editFormsVisibility];
                      newVisibility[index] = !newVisibility[index]; // 'index' is the index of the note in the loop
                      setEditFormsVisibility(newVisibility);
                    }}
                    className="btn btn-light me-3"
                  >
                    {editFormsVisibility[index] ? "Close" : "Edit"}
                  </button>
                  <button
                    onClick={() => deleteNote(note._id)}
                    className="btn btn-dark"
                  >
                    Delete
                  </button>
                </div>

                <FormEditNote
                  note={note}
                  user={user}
                  toggleFormEditNote={editFormsVisibility[index]}
                />
              </Reorder.Item>
            ))
          ) : (
            <div className={style.card}>
              <h3 className="m-0">No notes...</h3>
            </div>
          )
        ) : (
          <Loading />
        )}
      </Reorder.Group>
    </section>
  );
};

Notes.propTypes = {
  notes: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  getNotes: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  notes: state.notes.notes,
  user: state.user.user,
});

export default connect(mapStateToProps, {
  getUser,
  getNotes,
  deleteNote,
})(Notes);
