import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import WeatherCard from "./WeatherCard";

const Home = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [citylat, setCitylat] = useState(1);
  const [citylon, setCitylon] = useState(1);
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);

  const getCities = async (e) => {
    // if (e.key === "Enter") {
    let response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputSearch}&limit=1&appid=436d5eb42d8b4ef7b72bd8d989db2fc1`);

    const data = await response.json();
    setCity(data);
    setCitylat(data[0].lat);
    setCitylon(data[0].lon);
    console.log(data);
    console.log(citylat);
    console.log(citylon);
    //}
  };

  const getWeather = async () => {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${citylat}&lon=${citylon}&appid=436d5eb42d8b4ef7b72bd8d989db2fc1`);

    const data = await response.json();
    setWeather(data);
    // console.log(data);
  };

  useEffect(() => {
    getWeather();
  }, [inputSearch]);

  return (
    <div className="card-container">
      <div className="search">
        <input
          type="text"
          placeholder="Search here"
          onChange={(e) => {
            setInputSearch(e.target.value);
          }}
          onKeyUp={getCities}
        />
      </div>

      {weather && city && (
        <div className="weather-info">
          <div className="right-side-info">
            <div className="table-info">
              <Table className="table-top">
                <tbody>
                  <tr>
                    <td>PRESSURE</td>

                    <td>{weather.main.pressure}hPa</td>
                  </tr>
                  <tr>
                    <td>HUMIDITY</td>

                    <td>{weather.main.humidity}%</td>
                  </tr>
                  <tr>
                    <td>WIND</td>
                    <td>{weather.wind.speed}m/s</td>
                  </tr>
                </tbody>
              </Table>

              <Table className="table-bottom">
                <tbody>
                  <tr>
                    <td>MIN TEMP.</td>

                    <td>{Math.floor(weather.main.temp_min - 273.15)}°C</td>
                  </tr>
                  <tr>
                    <td>MAX TEMP.</td>

                    <td>{Math.floor(weather.main.temp_max - 273.15)}°C</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          <div className="right-side">
            <div className="content">
              <div className="top-content">
                <div className="day">Friday</div>
                <div className="date">{new Date().toLocaleDateString()}</div>
                <div className="location">{city[0].name}</div>
              </div>
              <div className="bottom-content">
                <div className="icon">Icon</div>
                <div className="temperature">{Math.floor(weather.main.temp - 273.15)}°C</div>
                <div className="status">{weather.weather[0].description}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
