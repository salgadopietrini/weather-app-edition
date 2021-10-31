import React from "react";
import "../styles/CurrentForecast.css";
import { connect } from "react-redux";

const WeatherCondition = (props) => {
  return (
    <div className="condition">
      it's {props.condition} and the local time is{" "}
      {props.timeFormat && props.localTime.slice(-5, -3) <= 12
        ? props.localTime.slice(-5, -3) + ":" + props.localTime.slice(-2) + "am"
        : props.timeFormat
        ? props.localTime.slice(-5, -3) -
          12 +
          ":" +
          props.localTime.slice(-2) +
          "pm"
        : props.localTime.slice(-5)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  location: state.weatherData.location,
  responseLocation: state.weatherData.responseLocation,
  condition: state.weatherData.condition,
  localTime: state.weatherData.localTime,
  timeFormat: state.weatherData.timeFormat,
});

export default connect(mapStateToProps)(WeatherCondition);
