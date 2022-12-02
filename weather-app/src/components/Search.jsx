import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import icon from "../icons/cloud.svg";

const Home = () => {
  const [inputSearch, setInputSearch] = useState("Search here...");
  const [citylat, setCitylat] = useState(48.8588897);
  const [citylon, setCitylon] = useState(2.3200410217200766);
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);

  const d = new Date();
  let day = d.getDay();
  const daysArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const getCities = async (e) => {
    if (e.key === "Enter") {
      let response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputSearch}&limit=1&appid=436d5eb42d8b4ef7b72bd8d989db2fc1`);

      const data = await response.json();
      setCity(data);

      setCitylat(data[0].lat);
      setCitylon(data[0].lon);
      console.log(data);
      console.log(citylat);
      console.log(citylon);
    }
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
      <div className="weather-info">
        <div className="search">
          <input
            type="text"
            placeholder={inputSearch}
            onChange={(e) => {
              setInputSearch(e.target.value);
            }}
            onKeyUp={getCities}
          />
        </div>
        <div className="right-side-info">
          {weather && (
            <div className="table-info">
              <Table className="table-top">
                <tbody>
                  <tr>
                    <td>PRESSURE</td>

                    <td className="values">{weather.main.pressure}hPa</td>
                  </tr>
                  <tr>
                    <td>HUMIDITY</td>

                    <td className="values">{weather.main.humidity}%</td>
                  </tr>
                  <tr>
                    <td>WIND</td>
                    <td className="values">{weather.wind.speed}m/s</td>
                  </tr>
                </tbody>
              </Table>

              <Table className="table-bottom">
                <tbody>
                  <tr>
                    <td>MIN TEMP.</td>

                    <td className="values">{Math.floor(weather.main.temp_min - 273.15)}°C</td>
                  </tr>
                  <tr>
                    <td>MAX TEMP.</td>

                    <td className="values">{Math.floor(weather.main.temp_max - 273.15)}°C</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          )}
        </div>
        {weather && (
          <div className="right-side">
            <div className="content">
              <div className="top-content">
                <div className="day">{daysArray[day]}</div>
                <div className="date">{new Date().toLocaleDateString()}</div>
                {city && <div className="location">{city[0].name}</div>}
              </div>
              <div className="bottom-content">
                <div className="icon">
                  <img src={icon} alt="icon" />
                </div>
                <div className="temperature">{Math.floor(weather.main.temp - 273.15)}°C</div>
                <div className="status">{weather.weather[0].description}</div>
              </div>
            </div>
            <div className="overlay"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
