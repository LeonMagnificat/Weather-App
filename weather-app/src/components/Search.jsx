import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [citylat, setCitylat] = useState(1);
  const [citylon, setCitylon] = useState(1);
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);

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
    <>
      <div>
        <input
          type="text"
          placeholder="Search here"
          onChange={(e) => {
            setInputSearch(e.target.value);
          }}
          onKeyUp={getCities}
        />
      </div>
      <div>
        {weather && city && (
          <h3>
            it is {Math.floor(weather.main.temp - 273.15)}°C in {city[0].name}
          </h3>
        )}
      </div>
    </>
  );
};

export default Home;
