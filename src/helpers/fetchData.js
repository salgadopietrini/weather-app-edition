const fetchData = async (location, days) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=52371a4a6db84b44b26132325212810&q=${location}&days=${days}&aqi=no&alerts=no`
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

export default fetchData;
