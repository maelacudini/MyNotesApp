import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUser } from "../actions/user";
import AuthHome from "./AuthHome";
import NotAuthHome from "./NotAuthHome";

const Home = ({ isAuthenticated, getUser, user }) => {
  useEffect(() => {
    getUser();
  }, []);

  return (
    <main>{isAuthenticated && user ? <AuthHome /> : <NotAuthHome />}</main>
  );
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool,
  getUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user,
});

export default connect(mapStateToProps, { getUser })(Home);
