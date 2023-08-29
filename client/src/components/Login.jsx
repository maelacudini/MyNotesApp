import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import style from "../css/app.module.css";
import Alert from "./Alert";
import { setAlert } from "../actions/alert";
import plant from "../assets/plant.png";

const Login = ({ login, isAuthenticated, user: { user }, alert }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const { email, password } = input;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <section className={style.login}>
      <div className="d-flex align-items-end">
        <img
          src="https://marketplace.canva.cn/u0LUo/MAD-j4u0LUo/2/tl/canva-huuumans%E4%BA%BA%E7%89%A9%E4%BE%A7%E9%9D%A2%E6%8F%92%E7%94%BB%E5%85%83%E7%B4%A0%E5%9D%90%E5%A7%BF-MAD-j4u0LUo.png"
          alt="huumnans"
          height={"300px"}
          width={"auto"}
          style={{ marginLeft: "5%", marginBottom: "-6px" }}
        />
        <img
          src={plant}
          alt="plant"
          height={"200px"}
          width={"auto"}
          style={{ zIndex: -1, marginLeft: "-100px" }}
        />
      </div>
      <form className={style.card} onSubmit={handleSubmit}>
        <h1 className="mb-3">Login!</h1>
        {alert && alert.length > 0 && (
          <div className="mb-3">
            <Alert />
          </div>
        )}
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
        <div className="mb-3">
          <label htmlFor="password">Your Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-light">
          Login
        </button>
      </form>
    </section>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object.isRequired,
  alert: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user,
  alert: state.alert,
});

export default connect(mapStateToProps, { login, setAlert })(Login);
