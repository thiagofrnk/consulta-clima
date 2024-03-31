'use client'
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherForecast, setWeatherForecast] = useState<any>(null); // Definindo weatherForecast como any

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  }

  const handleSearch = () => {
    const host = "https://api.weatherapi.com/v1";
    const key = "1da59d72e8d04150b0e122904242703";
    const lang = "pt";
    fetch(`${host}/current.json?key=${key}&q=${city}&lang=${lang}`)
      .then(resp => resp.json())
      .then((data) => {
        setWeatherForecast(data);
      })
      .catch(error => {
        console.error('Error fetching weather forecast:', error);
      });
  }

  return (
    <div>
      <main className="flex flex-col justify-center items-center justify-items-center bg-gradient-to-r from-cyan-500 to-blue-500 h-screen ">
      
      <label
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
            <Image 
            src={`https:${weatherForecast.current.condition.icon}`}
            width={64}
            height={64}
            alt="Weather Icon"/>
            <p>{weatherForecast.current.condition.text}</p>
          </div>
            
          
        </div>
      )}
      
      
    </main>
    </div>
    
  );
}
