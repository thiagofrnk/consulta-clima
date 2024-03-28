'use client'
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherForecast, setWeatherForecast] = useState(null);

  const handleChange = (e:any) => {
    setCity(e.target.value);
  }

  const handleSearch = () => {
    const host = "http://api.weatherapi.com/v1";
    const key = "1da59d72e8d04150b0e122904242703";
    const lang= "pt"
    fetch(`${host}/current.json?key=${key}&q=${city}&lang=${lang}`)
      .then(resp => resp.json())
      .then((data) => {
        setWeatherForecast(data);
      });
  }

  return (
    <div>
      <main className="flex flex-col justify-center items-center justify-items-center bg-gradient-to-r from-cyan-500 to-blue-500 h-screen ">
      
      <label for="pesquisa"
        className="font-semibold text-lg mb-2 cursor-pointer text-white">
        Pesquise a cidade que deseja!
      </label>

      <input 
        className="bg-black opacity-50 text-white rounded-md p-2 cursor-text"
        onChange={handleChange}
        type="text" 
        value={city}
        name="pesquisa"
        id="pesquisa"
      />

      <button
        className="bg-orange-500 hover:bg-orange-400 m-3 p-2 rounded-xl text-white hover:text-gray-200 transition-all "
        onClick={handleSearch}>
        Pesquisar
      </button>

      
      {weatherForecast && (
        <div className="text-white font-medium bg-black/50 p-3 rounded-md">
          
          <div className="flex flex-col justify-items-center items-center m-2 ">
            <h3>Esse é o clima de {city}</h3>
            <p>Temperatura: {weatherForecast.current.temp_c}°C</p>
            <p><img src={weatherForecast.current.condition.icon}/></p>
            <p>{weatherForecast.current.condition.text}</p>
          </div>
            
          
        </div>
      )}
      
      
    </main>
    </div>
    
  );
}