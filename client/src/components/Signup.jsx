import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "../css/app.module.css";
import Alert from "./Alert";
import { register } from "../actions/auth";
import { setAlert } from "../actions/alert";
import plant from "../assets/plant2.png";

const Signup = ({
  isAuthenticated,
  user: { user },
  alert,
  register,
  setAlert,
}) => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = input;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === password2) {
      try {
        await register(name, email, password);
      } catch (error) {
        console.error(error.message);
      }
    } else {
      setAlert("Passwords do not match", "danger");
    }
  };

  return (
    <section className={style.signup}>
      <div className="d-flex justify-content-end align-items-end">
        <img
          src="https://assets.website-files.com/5bff8886c3964a992e90d465/5c00fa0eb8b0816e1a10dfe6_hero-2.svg"
          alt="huumnans"
          height={"300px"}
          width={"auto"}
          style={{ rotate: "17deg", marginBottom: "-31px", marginRight: "5%" }}
        />
        <img
          src={plant}
          alt="plant"
          height={"200px"}
          width={"auto"}
          style={{ zIndex: -1, marginLeft: "-100px", opacity: 0.8 }}
        />
      </div>
      <form className={style.card} onSubmit={handleSubmit}>
        <h1 className="mb-3">Signup!</h1>
        {alert && alert.length > 0 && (
          <div className="mb-3">
            <Alert />
          </div>
        )}

        <div className="row">
          <div className="col-sm-6">
            <div className="mb-3">
              <label htmlFor="username">Your Username</label>
              <input
                className="form-control"
                type="username"
                name="username"
                id="username"
                placeholder="user"
                value={name}
                onChange={(e) => setInput({ ...input, name: e.target.value })}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb-3">
              <label htmlFor="email">Your Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                id="email"
                placeholder="user@gmail.com"
                value={email}
                onChange={(e) => setInput({ ...input, email: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password">Your Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            placeholder="Create a strong password!"
            // pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$"
            value={password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password2">Confirm Password</label>
          <input
            className="form-control"
            type="password"
            name="password2"
            id="password2"
            // pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$"
            value={password2}
            onChange={(e) => setInput({ ...input, password2: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Signup
        </button>
      </form>
    </section>
  );
};

Signup.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object.isRequired,
  alert: PropTypes.array.isRequired,
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user,
  alert: state.alert,
});

export default connect(mapStateToProps, { register, setAlert })(Signup);
