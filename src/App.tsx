import React, { useEffect, useRef, useState } from "react";
import { fetchWeatherData } from "./axios";
import "./App.css";
import logo from "./assets/nn.png";
import loading from "./assets/lo.gif"
import font1 from "./assets/font.gif"
const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [city, setCity] = useState<string>("");
  const cityRef= useRef<HTMLInputElement | null>(null);

  function handlebtn(){
    setCity(cityRef.current?.value || ""  )
  }



  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await fetchWeatherData(city);
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather:", error);
        alert(error)  
    }   
    };

    getWeather();
  }, [city]);
  console.log(weatherData);

  return (
    <div className="w-full relative">

    <div className="w-full flex text-white max-w-[967px] mx-auto flex-col py-10 gap-10 ">
        <i className="fa-solid fa-cloud absolute top-[300px] text-[96px] left-10 -z-10"></i>
        <i className="fa-solid fa-cloud absolute top-[500px] text-7xl right-20 -z-10"></i>
        <img src={font1} className="absolute right-5 w-[100px]" alt="" />
      <header className="px-5 flex justify-between items-center w-full bg-white/60 rounded-md h-20">
        <img className="w-14 rounded-full" src={logo} alt="" />
        <div className="flex relative">
          <input
            ref={cityRef}
            type="text"
            placeholder="City"
            className="text-black font-bold text-xl px-3 py-2 border-2 bg-transparent  outline-none border-blue-700 rounded-sm "
          />
          <button onClick={handlebtn} className="px-3 py-2 text-xl bg-blue-700">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <button className="px-4 py-2   font-bold text-lg rounded-md bg-blue-700 ">
            <a href="https://t.me/numonovdev">
          <i className="fa-brands fa-telegram"></i> Join{" "}
            </a>
        </button>
      </header>
      <main className="flex flex-col items-center gap-4">
        <h1 className="text-center font-semibold text-3xl">Weather</h1>
        <div className="w-full flex justify-center  p-4  gap-20">
          {weatherData ? (
            <div className="flex flex-col gap-4 bg-white/10 p-4 rounded-md shadow-md">
              <h1 className="text-center font-semibold text-3xl">
                Weather in {city}
              </h1>
              <div>
                <p className="text-lg font-bold">
                  Temperature: {weatherData.main.temp}°C
                </p>
                <p>Feels Like: {weatherData.main.feels_like}°C</p>
                <p>Minimum Temperature: {weatherData.main.temp_min}°C</p>
                <p>Maximum Temperature: {weatherData.main.temp_max}°C</p>
                <p>Humidity: {weatherData.main.humidity}%</p>
                <p>Pressure: {weatherData.main.pressure} hPa</p>
                <p>Ground Level Pressure: {weatherData.main.grnd_level} hPa</p>
                <p>Sea Level Pressure: {weatherData.main.sea_level} hPa</p>
                <p>Weather Description: {weatherData.weather[0].description}</p>
              </div>
            </div>
          ) : (
            <img className="w-48" src={loading} alt="" />
          )}
          <div className="hidden">two</div>
        </div>
      </main>
    </div>
    </div>
  );
};

export default App;
