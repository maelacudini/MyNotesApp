import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Alert = ({ alerts }) => {
  return (
    <div>
      {alerts.map((alert) => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          {alert.msg}
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

Alert.propTypes = { alerts: PropTypes.array.isRequired };

export default connect(mapStateToProps)(Alert);
