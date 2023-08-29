import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import style from "../css/app.module.css";
import { getUser } from "../actions/user";
import Notes from "./Notes";
import Loading from "./Loading";

const AuthHome = ({ user: { user, loading }, getUser }) => {
  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div className={style.authHome}>
      {!user ? (
        <p>
          <Loading />
        </p>
      ) : (
        <section>
          <article>
            <h1 className={style.title}>Hello, {user.name}!</h1>
            <p className={style.subtitle}>
              Your productivity journey begins here.
            </p>
          </article>
          <Notes />
        </section>
      )}
    </div>
  );
};

AuthHome.propTypes = {
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUser })(AuthHome);
