import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import style from "../css/app.module.css";
import Loading from "./Loading";
import { loadUser } from "../actions/auth";
import { deleteUser, getUser, updateUser } from "../actions/user";
import { setAlert } from "../actions/alert";
import Alert from "../components/Alert";

const Account = ({
  isAuthenticated,
  user,
  loadUser,
  getUser,
  updateUser,
  deleteUser,
  setAlert,
  alert,
}) => {
  const [input, setInput] = useState({
    name: "",
    password: "",
    password2: "",
  });

  const { name, password, password2 } = input;

  useEffect(() => {
    loadUser();
    getUser();
  }, [loadUser, getUser]);

  function handleSubmitUpdate(e) {
    e.preventDefault();

    const updatedInput = { ...input };

    if (
      updatedInput.name.trim() === "" &&
      updatedInput.password.trim() === "" &&
      updatedInput.password2.trim() === ""
    ) {
      console.log("empty fields");
      setAlert("All fields are empty, can't work with that!", "danger");
      return;
    } else if (
      updatedInput.password.trim() !== "" &&
      updatedInput.password2.trim() !== "" &&
      updatedInput.password.trim() === updatedInput.password2.trim()
    ) {
      setAlert(
        "Your new password cannot be the same as the current one",
        "danger"
      );
      return;
    }

    updateUser(updatedInput, user._id);
  }

  if (!user) {
    return <p>loading</p>;
  }

  return (
    <section className={style.account}>
      <h1 className={style.title}>
        Welcome to your private area,{" "}
        {input.name.trim() !== "" ? input.name : user.name}.
      </h1>
      <p className={style.subtitle}>
        Here you can edit your personal informations and delete your account,
        &nbsp;
        <del>if you really hate us</del>.
      </p>
      <div className="d-flex justify-content-center">
        <img
          src="https://i.pinimg.com/originals/db/18/5d/db185dce3857b8d0c42633cb798cf83b.png"
          alt="huumans"
          height={"100%"}
          width={"100%"}
          style={{ marginTop: "100px", marginBottom: "-5px" }}
        />
      </div>
      <article className={style.card}>
        <Alert />
        <form onSubmit={handleSubmitUpdate}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={`${user.name}`}
                  aria-label="Username"
                  value={name}
                  onChange={(e) => setInput({ ...input, name: e.target.value })}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  aria-label="email"
                  defaultValue={`${user.email}`}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label>Current password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  aria-label="password"
                  value={password}
                  onChange={(e) =>
                    setInput({ ...input, password: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label>New password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="New password"
                  aria-label="password2"
                  value={password2}
                  onChange={(e) =>
                    setInput({ ...input, password2: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-light">
            Edit
          </button>
        </form>
      </article>

      <article className={style.danger}>
        <h5>Danger Zone</h5>
        <div className="d-flex justify-content-between align-items-baseline">
          <p className="m-0">Want to delete this account?</p>
          <button onClick={() => deleteUser()} className="btn btn-danger">
            Delete
          </button>
        </div>
      </article>
    </section>
  );
};

Account.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  setAlert: PropTypes.func.isRequired,
  alert: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user.user,
  isAuthenticated: state.auth.isAuthenticated,
  alert: state.alert,
});

export default connect(mapStateToProps, {
  loadUser,
  getUser,
  setAlert,
  deleteUser,
  updateUser,
})(Account);
