import store from "../store";
import {
    CHANGE_FORECAST_MODE,
    CHANGE_TEMP_SCALE,
    SET_CITY,
    SET_HOURLY_FORECAST,
    SET_WEATHER
} from "./actionTypes";
import fetchData from "../../helpers/fetchData";
import getArrOfHours from "../../helpers/getArrOfHours";

export const setCity = (city) => ({type: SET_CITY, payload: city})
export const setWeather = (response) => ({type: SET_WEATHER, payload: response})
export const changeTempScale = (response) => ({type: CHANGE_TEMP_SCALE, payload: response})
export const changeForecastMod = (response) => ({type: CHANGE_FORECAST_MODE, payload: response})
export const setHourlyForecast = (response) => ({
    type: SET_HOURLY_FORECAST, payload: response.map((hour) => {
        return {
            temp_c: hour.temp_c,
            temp_f: hour.temp_f,
            hour: hour.time,
            isDay: hour.is_day,
            code: hour.condition.code
        };
    })
})


export const initialState = {
    location: '',
    responseLocation: '',
    country: '',
    temp_c: '',
    temp_f: '',
    condition: '',
    wind: '',
    pressure: '',
    humidity: '',
    code: '',
    isDay: '',
    tempScale: 'celsius',
    hourlyForecast: [],
    threeDayForecast: [],
    forecastMod: 'threeDay'
};

export function weatherReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CITY:
            return {...state, location: action.payload.toLowerCase()};
        case SET_WEATHER:
            return {
                ...state,
                responseLocation: action.payload.location.name,
                country: action.payload.location.country,
                temp_c: action.payload.current.temp_c.toFixed(),
                temp_f: action.payload.current.temp_f.toFixed(),
                condition: action.payload.current.condition.text.toLowerCase(),
                wind: action.payload.current.wind_kph,
                pressure: action.payload.current.pressure_mb,
                humidity: action.payload.current.humidity,
                code: action.payload.current.condition.code,
                isDay: action.payload.current.is_day,
                threeDayForecast: action.payload.forecast.forecastday.map((day) => {
                    return {
                        date: day.time,
                        temp_c: day.day.avgtemp_c,
                        temp_f: day.day.avgtemp_f,
                        isDay: day.day.is_day,
                        code: day.day.condition.code,
                        condition: day.day.condition.text.toLowerCase()
                    }
                })
            };
        case SET_HOURLY_FORECAST:
            return {
                ...state,
                hourlyForecast: action.payload
            }
        case CHANGE_TEMP_SCALE:
            return {
                ...state,
                tempScale: action.payload
            };
        case CHANGE_FORECAST_MODE:
            return {
                ...state,
                forecastMod: action.payload
            }
        default:
            return state;
    }
}

// This API on the free plan provides a maximum of a three-day forecast
export const fetchWeather = (debouncedLocation, days = 3) => async () => {
    try {
        const data = await (fetchData(debouncedLocation, days));
        store.dispatch(setWeather(data));
        const hourlyForecast = getArrOfHours(data.forecast.forecastday[0].hour, data.forecast.forecastday[1].hour);
        store.dispatch(setHourlyForecast(hourlyForecast));
        localStorage.setItem('location', data.location.name);
    } catch (e) {
        console.error(e);
    }
}