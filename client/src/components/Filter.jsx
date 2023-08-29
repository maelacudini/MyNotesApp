import React from "react";
import PropTypes from "prop-types";
import style from "../css/app.module.css";

const Filter = ({ handleSearch }) => {
  return (
    <article className={style.filter}>
      <div className="input-group">
        <input
          type="text"
          className={`form-control ${style.card}`}
          placeholder="Search notes by keyword"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={handleSearch}
        />
      </div>
    </article>
  );
};

Filter.propTypes = {};

export default Filter;
