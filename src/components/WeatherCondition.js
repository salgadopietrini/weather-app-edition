import React from "react";
import "../styles/CurrentForecast.css";
import { connect } from "react-redux";

const WeatherCondition = (props) => {
  return (
    <div className="condition">
      it's {props.condition} and the local time is {props.localTime.slice(-5)}
      {props.localTime.slice(-5, -3) < 12 ? "am" : "pm"}
    </div>
  );
};

const mapStateToProps = (state) => ({
  location: state.weatherData.location,
  responseLocation: state.weatherData.responseLocation,
  condition: state.weatherData.condition,
  localTime: state.weatherData.localTime,
});

export default connect(mapStateToProps)(WeatherCondition);
