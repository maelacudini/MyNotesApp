import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import PropTypes from "prop-types";
import Alert from "./Alert";
import { logout } from "../actions/auth";
import huumans from "../assets/huumans.svg";

const Nav = ({ setAlert, isAuthenticated, logout }) => {
  return (
    <nav className="navbar">
      <Link className="navbar-brand text-light" to="/">
        MyNotesApp
      </Link>
      {isAuthenticated ? (
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <Link
              className="nav-link text-light"
              aria-current="page"
              to="/account"
            >
              Account
            </Link>
          </li>
          <li className="nav-item">
            <a onClick={logout} className="btn btn-dark" aria-current="page">
              Logout
            </a>
          </li>
        </ul>
      ) : (
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <Link
              className="nav-link text-light"
              aria-current="page"
              to="/login"
            >
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="btn btn-dark" aria-current="page" to="/signup">
              Signup
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

Nav.propTypes = {
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, logout })(Nav);
