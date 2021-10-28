import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { connect } from "react-redux";
import {
  changeTempScale,
  changeTimeFormat,
} from "../store/weatherReducer/weatherReducer";

const TempScaleToggle = (props) => {
  if (!localStorage.getItem("tempScale")) {
    localStorage.setItem("tempScale", "celsius");
  }
  const [value, setValue] = useState(localStorage.getItem("tempScale"));
  const [time, setTime] = useState(localStorage.getItem("timeFormat"));
  return (
    <div>
      <ToggleButtonGroup
        color="secondary"
        value={value}
        exclusive
        fullWidth={true}
        sx={{ height: "20px" }}
        onChange={() => {
          if (value === "celsius") {
            setValue("fahrenheit");
            props.changeTempScale("fahrenheit");
            localStorage.setItem("tempScale", "fahrenheit");
          } else {
            setValue("celsius");
            props.changeTempScale("celsius");
            localStorage.setItem("tempScale", "celsius");
          }
        }}
      >
        <ToggleButton
          value="fahrenheit"
          sx={{
            "&.MuiToggleButton-root": {
              borderRadius: "20px",
              backgroundColor: "transparent",
              borderColor: "#F9FBFF",
              color: "#2d81ff",
              textTransform: "capitalize",
            },
            "&.Mui-selected": {
              backgroundColor: "#6BA6FF",
              borderColor: "#6BA6FF",
              color: "#ffffff",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#5096ff",
              color: "#ffffff",
            },
          }}
        >
          Fahrenheit
        </ToggleButton>
        <ToggleButton
          value="celsius"
          sx={{
            "&.MuiToggleButton-root": {
              borderRadius: "20px",
              backgroundColor: "transparent",
              borderColor: "#F9FBFF",
              color: "#2d81ff",
              textTransform: "capitalize",
            },
            "&.Mui-selected": {
              backgroundColor: "#6BA6FF",
              borderColor: "#6BA6FF",
              color: "#ffffff",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#5096ff",
              color: "#ffffff",
            },
          }}
        >
          Celsius
        </ToggleButton>
      </ToggleButtonGroup>
      <br />
      <br />

      <ToggleButtonGroup
        color="secondary"
        value={time}
        exclusive
        fullWidth={true}
        sx={{ height: "20px" }}
        onChange={() => {
          if (time) {
            setTime(false);
            props.changeTimeFormat(false);
            localStorage.setItem("timeFormat", false);
          } else {
            setTime(true);
            props.changeTimeFormat(true);
            localStorage.setItem("timeFormat", true);
          }
        }}
      >
        <ToggleButton
          value={true}
          sx={{
            "&.MuiToggleButton-root": {
              borderRadius: "20px",
              backgroundColor: "transparent",
              borderColor: "#F9FBFF",
              color: "#2d81ff",
              textTransform: "capitalize",
            },
            "&.Mui-selected": {
              backgroundColor: "#6BA6FF",
              borderColor: "#6BA6FF",
              color: "#ffffff",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#5096ff",
              color: "#ffffff",
            },
          }}
        >
          12hr
        </ToggleButton>
        <ToggleButton
          value={false}
          sx={{
            "&.MuiToggleButton-root": {
              borderRadius: "20px",
              backgroundColor: "transparent",
              borderColor: "#F9FBFF",
              color: "#2d81ff",
              textTransform: "capitalize",
            },
            "&.Mui-selected": {
              backgroundColor: "#6BA6FF",
              borderColor: "#6BA6FF",
              color: "#ffffff",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#5096ff",
              color: "#ffffff",
            },
          }}
        >
          24hr
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tempScale: state.weatherData.tempScale,
});

const mapDispatchToProps = (dispatch) => ({
  changeTempScale: (value) => {
    dispatch(changeTempScale(value));
  },
  changeTimeFormat: (value) => {
    dispatch(changeTimeFormat(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TempScaleToggle);
